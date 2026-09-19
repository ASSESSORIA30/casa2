/**
 * Motor de planos conceptuales.
 * Cada vivienda se define con una configuración (src/data/plan-configs.ts) y este
 * módulo calcula habitaciones, puertas, ventanas y cuadro de superficies.
 * Sistema: x = este, y = sur (metros). Norte arriba. Jardín/porche al sur.
 */
export type RoomType =
  | "hall" | "corridor" | "living" | "salon" | "comedor" | "cocina"
  | "dorm" | "suite" | "bath" | "vest" | "lav" | "desp" | "office" | "tech" | "gym";

export interface RoomSpec {
  id: string;
  name: string;
  type: RoomType;
  /** service/living: ancho · columnas apiladas: alto (si se omite, ocupa el resto) */
  size?: number;
  doorTo?: string;
}
export interface Col { w: number; rooms: RoomSpec[] }
export interface Outdoor {
  kind: "porch" | "pool" | "poolReady" | "carport" | "garage";
  name: string; x: number; y: number; w: number; h: number;
}
export interface PlanConfig {
  W: number; D: number;
  /** ancho del bloque de día (oeste) */
  dw: number;
  /** alto de la banda de servicio (norte del bloque de día) */
  sh: number;
  entryX: number;
  service: RoomSpec[];
  living: RoomSpec[];
  /** alto de la fila norte del bloque de noche */
  nh: number;
  ch?: number;
  north: Col[];
  south: Col[];
  outdoor: Outdoor[];
}
export interface Room { id: string; name: string; type: RoomType; x: number; y: number; w: number; h: number; doorTo?: string; area: number }
export interface Door { roomId: string; kind: "v" | "h"; e: number; a: number; len: number; dir: 1 | -1 }
export interface Win { x1: number; y1: number; x2: number; y2: number; big: boolean }
export interface PlanSummary {
  W: number; D: number; built: number; usable: number; porch: number; garage: number;
  bedrooms: number; bathrooms: number; pool: boolean;
}
export interface Plan {
  rooms: Room[]; outdoor: Outdoor[]; doors: Door[]; windows: Win[];
  entry: { x: number; len: number };
  bbox: { x0: number; y0: number; x1: number; y1: number };
  summary: PlanSummary;
}

const EPS = 0.02;
const WALL = 0.22;
export const LIVING_FAMILY: RoomType[] = ["living", "salon", "comedor", "cocina"];
const HUBS: RoomType[] = ["corridor", "hall", ...LIVING_FAMILY];
const netArea = (w: number, h: number) => Math.max(0, (w - WALL) * (h - WALL));
const round1 = (n: number) => Math.round(n * 10) / 10;

export const r = (id: string, name: string, type: RoomType, size?: number, doorTo?: string): RoomSpec => ({ id, name, type, size, doorTo });
export const col = (w: number, rooms: RoomSpec[]): Col => ({ w, rooms });

type Box = { x: number; y: number; w: number; h: number };

function shared(a: Box, b: Box) {
  if (Math.abs(a.x + a.w - b.x) < EPS || Math.abs(b.x + b.w - a.x) < EPS) {
    const e = Math.abs(a.x + a.w - b.x) < EPS ? b.x : a.x;
    const lo = Math.max(a.y, b.y), hi = Math.min(a.y + a.h, b.y + b.h);
    if (hi - lo > EPS) return { kind: "v" as const, e, lo, hi };
  }
  if (Math.abs(a.y + a.h - b.y) < EPS || Math.abs(b.y + b.h - a.y) < EPS) {
    const e = Math.abs(a.y + a.h - b.y) < EPS ? b.y : a.y;
    const lo = Math.max(a.x, b.x), hi = Math.min(a.x + a.w, b.x + b.w);
    if (hi - lo > EPS) return { kind: "h" as const, e, lo, hi };
  }
  return null;
}

export function buildPlan(c: PlanConfig): Plan {
  const rooms: Room[] = [];
  const push = (s: RoomSpec, x: number, y: number, w: number, h: number) =>
    rooms.push({ id: s.id, name: s.name, type: s.type, doorTo: s.doorTo, x, y, w, h, area: round1(netArea(w, h)) });
  const ch = c.ch ?? 1.0;

  let x = 0;
  for (const s of c.service) { push(s, x, 0, s.size!, c.sh); x += s.size!; }
  x = 0;
  for (const s of c.living) { push(s, x, c.sh, s.size!, c.D - c.sh); x += s.size!; }
  push({ id: "corr", name: "Distribuidor", type: "corridor" }, c.dw, c.nh, c.W - c.dw, ch);

  const stack = (cols: Col[], y0: number, total: number) => {
    let cx = c.dw;
    for (const cl of cols) {
      let cy = y0;
      const fixed = cl.rooms.reduce((s, q) => s + (q.size ?? 0), 0);
      for (const q of cl.rooms) {
        const h = q.size ?? total - fixed;
        push(q, cx, cy, cl.w, h);
        cy += h;
      }
      cx += cl.w;
    }
  };
  stack(c.north, 0, c.nh);
  stack(c.south, c.nh + ch, c.D - c.nh - ch);

  // puertas
  const doors: Door[] = [];
  const byId = new Map(rooms.map((q) => [q.id, q]));
  const makeDoor = (room: Box & { id: string; type?: RoomType }, target: Box) => {
    const s = shared(room, target);
    if (!s) return false;
    const len = room.type === "bath" || room.type === "vest" ? 0.75 : 0.9;
    const span = s.hi - s.lo;
    if (span < len + 0.2) return false;
    const a = s.lo + (span - len) / 2;
    const dir: 1 | -1 = s.kind === "v"
      ? (Math.abs(room.x + room.w - s.e) < EPS ? -1 : 1)
      : (Math.abs(room.y + room.h - s.e) < EPS ? -1 : 1);
    doors.push({ roomId: room.id, kind: s.kind, e: s.e, a, len, dir });
    return true;
  };
  for (const q of rooms) {
    if (HUBS.includes(q.type)) continue;
    let done = false;
    if (q.doorTo && byId.get(q.doorTo)) done = makeDoor(q, byId.get(q.doorTo)!);
    if (done) continue;
    const cands = rooms
      .filter((t) => HUBS.includes(t.type))
      .map((t) => ({ t, s: shared(q, t) }))
      .filter((z) => z.s && z.s.hi - z.s.lo >= 1)
      .sort((p, q2) => {
        const pri = (t: Room) => (t.type === "corridor" ? 0 : t.type === "hall" ? 1 : 2);
        return pri(p.t) - pri(q2.t) || (q2.s!.hi - q2.s!.lo) - (p.s!.hi - p.s!.lo);
      });
    for (const cd of cands) if (makeDoor(q, cd.t)) break;
  }
  // garaje adosado: puerta al recibidor
  const garage = c.outdoor.find((o) => o.kind === "garage");
  const hall = rooms.find((q) => q.type === "hall");
  if (garage && hall) makeDoor({ ...garage, id: "garage" }, hall);

  // bbox del edificio (sin exteriores)
  const bb = {
    x0: Math.min(...rooms.map((q) => q.x)), y0: Math.min(...rooms.map((q) => q.y)),
    x1: Math.max(...rooms.map((q) => q.x + q.w)), y1: Math.max(...rooms.map((q) => q.y + q.h)),
  };
  // ventanas
  const windows: Win[] = [];
  const glazed: RoomType[] = ["dorm", "suite", "living", "salon", "comedor", "cocina", "office", "gym", "bath"];
  for (const q of rooms) {
    if (!glazed.includes(q.type)) continue;
    const fam = LIVING_FAMILY.includes(q.type);
    const add = (x1: number, y1: number, len: number, horiz: boolean, big: boolean) => {
      const l = big ? len * 0.86 : Math.min(len * 0.6, q.type === "bath" ? 0.7 : q.type === "suite" ? 2.6 : 1.8);
      const off = (len - l) / 2;
      windows.push(horiz ? { x1: x1 + off, y1, x2: x1 + off + l, y2: y1, big } : { x1, y1: y1 + off, x2: x1, y2: y1 + off + l, big });
    };
    if (Math.abs(q.y - bb.y0) < EPS && !fam) add(q.x, q.y, q.w, true, false);
    if (Math.abs(q.y + q.h - bb.y1) < EPS) add(q.x, q.y + q.h, q.w, true, fam || q.type === "suite");
    if (Math.abs(q.x + q.w - bb.x1) < EPS) add(q.x + q.w, q.y, q.h, false, q.type === "suite");
    if (Math.abs(q.x - bb.x0) < EPS && q.type !== "hall") add(q.x, q.y, q.h, false, fam);
  }

  const usable = rooms.reduce((s, q) => s + q.area, 0);
  const summary: PlanSummary = {
    W: c.W, D: c.D,
    built: round1(c.W * c.D),
    usable: round1(usable),
    porch: round1(c.outdoor.filter((o) => o.kind === "porch").reduce((s, o) => s + o.w * o.h, 0)),
    garage: round1(c.outdoor.filter((o) => o.kind === "garage" || o.kind === "carport").reduce((s, o) => s + o.w * o.h, 0)),
    bedrooms: rooms.filter((q) => q.type === "dorm" || q.type === "suite").length,
    bathrooms: rooms.filter((q) => q.type === "bath").length,
    pool: c.outdoor.some((o) => o.kind === "pool" || o.kind === "poolReady"),
  };
  return { rooms, outdoor: c.outdoor, doors, windows, entry: { x: c.entryX, len: 1.1 }, bbox: bb, summary };
}
