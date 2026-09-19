import type { ReactNode } from "react";
import type { Door, Plan, Room, RoomType } from "@/lib/plan";
import { LIVING_FAMILY } from "@/lib/plan";

const INK = "#24211E";
const PAPER = "#FBF9F4";
const FLOOR: Partial<Record<RoomType, string>> = {
  hall: "#F1ECE1", corridor: "#F3EFE6", living: "#F0E9DA", salon: "#F0E9DA", comedor: "#F1EBDD", cocina: "#EFE7D8",
  dorm: "#F4EFE4", suite: "#F1EADB", bath: "#E8E4DC", vest: "#EFE9DD", lav: "#EAE6DE", desp: "#EDE8DD", office: "#F2ECDF", tech: "#E6E2DA", gym: "#EEE8DC",
};
const F = { fill: "#FFFDF8", stroke: "#8A8175", strokeWidth: 0.035 } as const;
const F2 = { fill: "#EDE6D8", stroke: "#8A8175", strokeWidth: 0.03 } as const;

type Side = "N" | "S" | "E" | "W";
const OPP: Record<Side, Side> = { N: "S", S: "N", E: "W", W: "E" };
function doorSide(room: Room, door?: Door): Side {
  if (!door) return "S";
  if (door.kind === "v") return Math.abs(door.e - room.x) < 0.03 ? "W" : "E";
  return Math.abs(door.e - room.y) < 0.03 ? "N" : "S";
}
function frame(r: { x: number; y: number; w: number; h: number }, back: Side) {
  switch (back) {
    case "N": return { t: `translate(${r.x} ${r.y})`, a: r.w, b: r.h };
    case "S": return { t: `translate(${r.x + r.w} ${r.y + r.h}) rotate(180)`, a: r.w, b: r.h };
    case "W": return { t: `translate(${r.x} ${r.y + r.h}) rotate(-90)`, a: r.h, b: r.w };
    case "E": return { t: `translate(${r.x + r.w} ${r.y}) rotate(90)`, a: r.h, b: r.w };
  }
}
const Circ = ({ cx, cy, r = 0.2 }: { cx: number; cy: number; r?: number }) => <circle cx={cx} cy={cy} r={r} {...F} />;

/* ---------- mobiliario en marco local (pared "trasera" en y=0) ---------- */
function Bedroom({ a, b, suite }: { a: number; b: number; suite: boolean }) {
  const bw = suite ? 1.8 : 1.6, bl = 2.0, x = (a - bw) / 2, y = 0.14;
  return (
    <g>
      <rect x={x} y={y} width={bw} height={bl} rx={0.05} {...F} />
      <rect x={x + 0.1} y={y + 0.1} width={bw / 2 - 0.15} height={0.4} rx={0.08} {...F2} />
      <rect x={x + bw / 2 + 0.05} y={y + 0.1} width={bw / 2 - 0.15} height={0.4} rx={0.08} {...F2} />
      <line x1={x} y1={y + 0.85} x2={x + bw} y2={y + 0.85} stroke="#8A8175" strokeWidth={0.03} />
      {a >= bw + 0.9 && (<>
        <rect x={x - 0.46} y={0.12} width={0.4} height={0.4} {...F} />
        <rect x={x + bw + 0.06} y={0.12} width={0.4} height={0.4} {...F} />
      </>)}
      {a >= 3.0 && b >= 3.0 && <rect x={0.08} y={0.9} width={0.6} height={Math.min(2.4, b - 1.0)} {...F2} />}
      {suite && a >= 3.4 && <rect x={x + 0.1} y={y + bl + 0.05} width={bw - 0.2} height={0.35} rx={0.06} {...F2} />}
    </g>
  );
}
function Bath({ a, b, id }: { a: number; b: number; id: string }) {
  const small = a * b < 5.2;
  const sw = Math.min(0.95, a / 2.2);
  return (
    <g>
      {a >= 1.9 ? (
        <>
          <rect x={0.12} y={0.08} width={id === "bs" && a >= 2.3 ? 1.0 : 0.6} height={0.42} rx={0.1} {...F} />
          <rect x={id === "bs" && a >= 2.3 ? 1.35 : 0.95} y={0.06} width={0.38} height={0.66} rx={0.12} {...F} />
          {!small && b >= 1.2 && (
            <g>
              <rect x={a - sw - 0.08} y={0.08} width={sw} height={Math.min(0.95, b - 0.2)} {...F} />
              <line x1={a - sw - 0.08} y1={0.08} x2={a - 0.08} y2={0.08 + Math.min(0.95, b - 0.2)} stroke="#8A8175" strokeWidth={0.025} />
              <line x1={a - 0.08} y1={0.08} x2={a - sw - 0.08} y2={0.08 + Math.min(0.95, b - 0.2)} stroke="#8A8175" strokeWidth={0.025} />
            </g>
          )}
        </>
      ) : (
        <>
          <rect x={0.1} y={0.08} width={0.5} height={0.4} rx={0.1} {...F} />
          <rect x={0.12} y={0.62} width={0.38} height={0.62} rx={0.12} {...F} />
          {!small && <rect x={a - sw - 0.08} y={0.08} width={sw} height={sw} {...F} />}
        </>
      )}
    </g>
  );
}
function Vest({ a, b }: { a: number; b: number }) {
  return (
    <g>
      <rect x={0.08} y={0.08} width={a - 0.16} height={0.5} {...F2} />
      <rect x={0.08} y={0.6} width={0.5} height={Math.max(0.5, b - 0.7)} {...F2} />
      {Array.from({ length: Math.floor((a - 0.4) / 0.3) }).map((_, i) => (
        <line key={i} x1={0.3 + i * 0.3} y1={0.1} x2={0.3 + i * 0.3} y2={0.56} stroke="#8A8175" strokeWidth={0.02} />
      ))}
    </g>
  );
}
function Office({ a }: { a: number; b?: number }) {
  return (
    <g>
      <rect x={(a - 1.4) / 2} y={0.15} width={1.4} height={0.7} {...F} />
      <circle cx={a / 2} cy={1.15} r={0.24} {...F2} />
      <rect x={0.1} y={0.15} width={0.35} height={1.6} {...F2} />
    </g>
  );
}
function Lav({ a }: { a: number }) {
  return (
    <g>
      <rect x={0.1} y={0.1} width={0.6} height={0.6} rx={0.05} {...F} /><circle cx={0.4} cy={0.4} r={0.2} {...F2} />
      {a >= 1.6 && (<><rect x={0.8} y={0.1} width={0.6} height={0.6} rx={0.05} {...F} /><circle cx={1.1} cy={0.4} r={0.2} {...F2} /></>)}
      {a >= 2.4 && <rect x={a - 0.9} y={0.1} width={0.8} height={0.5} rx={0.05} {...F} />}
    </g>
  );
}
function Desp({ a, b }: { a: number; b: number }) {
  return (<g><rect x={0.08} y={0.08} width={a - 0.16} height={0.4} {...F2} /><rect x={0.08} y={0.5} width={0.4} height={Math.max(0.4, b - 0.6)} {...F2} /><rect x={a - 0.48} y={0.5} width={0.4} height={Math.max(0.4, b - 0.6)} {...F2} /></g>);
}
function Tech({ a }: { a: number }) {
  return (<g><circle cx={Math.min(0.5, a / 2)} cy={0.55} r={0.38} {...F} /><rect x={Math.min(0.5, a / 2) + 0.55} y={0.2} width={Math.max(0.5, a - 1.5)} height={0.7} {...F2} /></g>);
}
function Gym({ a, b }: { a: number; b: number }) {
  return (
    <g>
      <rect x={0.25} y={0.2} width={0.85} height={1.9} rx={0.08} {...F} />
      <rect x={1.4} y={0.3} width={1.6} height={0.5} rx={0.06} {...F2} />
      <rect x={1.4} y={1.1} width={1.9} height={Math.min(1.4, b - 1.3)} fill="none" stroke="#8A8175" strokeDasharray="0.1 0.08" strokeWidth={0.03} />
      <circle cx={a - 0.5} cy={0.5} r={0.22} {...F2} />
    </g>
  );
}

/* ---------- salón / cocina / comedor (orientación fija) ---------- */
function Kitchen({ x, y, w, h, long }: { x: number; y: number; w: number; h: number; long?: number }) {
  const L = Math.min(long ?? 4.2, w - 0.4);
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0.15} y={0.15} width={L} height={0.62} {...F2} />
      <rect x={L - 0.5} y={0.15} width={0.65} height={0.65} {...F} />
      <rect x={0.8} y={0.22} width={0.7} height={0.44} rx={0.06} {...F} />
      <circle cx={2.1} cy={0.46} r={0.13} {...F} /><circle cx={2.5} cy={0.46} r={0.13} {...F} />
      <rect x={0.9} y={1.5} width={Math.min(2.4, w * 0.45)} height={0.95} {...F} />
      {[0.3, 0.9, 1.5].filter((v) => v < Math.min(2.4, w * 0.45)).map((v) => <Circ key={v} cx={0.9 + v + 0.25} cy={2.7} r={0.17} />)}
      <text x={0} y={0} fontSize={0} />
      {h < 0 && null}
    </g>
  );
}
function OpenLiving({ r }: { r: Room }) {
  const { x, y, w, h } = r;
  const yL = 2.9, hL = Math.max(1.8, h - yL - 0.2);
  const wide = w >= 7;
  return (
    <g>
      <Kitchen x={x} y={y} w={w} h={h} />
      {/* comedor */}
      <g transform={`translate(${x + 0.5} ${y + yL + (hL - 0.9) / 2})`}>
        <rect x={0} y={0} width={1.8} height={0.9} rx={0.05} {...F} />
        <Circ cx={0.45} cy={-0.25} /><Circ cx={1.35} cy={-0.25} /><Circ cx={0.45} cy={1.15} /><Circ cx={1.35} cy={1.15} />
      </g>
      {/* estar */}
      {wide ? (
        <g transform={`translate(${x + 4.4} ${y + h - 1.35})`}>
          <rect x={-0.2} y={-2.4} width={3.6} height={2.4} rx={0.05} fill="none" stroke="#B9AE99" strokeDasharray="0.08 0.08" strokeWidth={0.03} />
          <rect x={0} y={0} width={2.8} height={0.95} rx={0.1} {...F2} />
          <rect x={0} y={-1.4} width={0.95} height={1.35} rx={0.1} {...F2} />
          <rect x={0.9} y={-1.2} width={1.3} height={0.65} rx={0.05} {...F} />
          <rect x={0.9} y={-2.5} width={1.8} height={0.4} {...F2} opacity={0} />
        </g>
      ) : (
        <g transform={`translate(${x + w - 1.15} ${y + yL + (hL - 2.2) / 2})`}>
          <rect x={0} y={0} width={0.95} height={2.2} rx={0.1} {...F2} />
          <rect x={-1.0} y={0.8} width={0.6} height={0.65} rx={0.05} {...F} />
        </g>
      )}
    </g>
  );
}
function Salon({ r }: { r: Room }) {
  const { x, y, w, h } = r;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={(w - 2) / 2} y={0.12} width={2} height={0.4} {...F2} />
      <rect x={(w - 3.4) / 2} y={h - 3.6} width={3.4} height={2.4} rx={0.05} fill="none" stroke="#B9AE99" strokeDasharray="0.08 0.08" strokeWidth={0.03} />
      <rect x={(w - 2.7) / 2} y={h - 1.5} width={2.7} height={0.95} rx={0.1} {...F2} />
      <rect x={(w - 1.2) / 2} y={h - 2.6} width={1.2} height={0.65} rx={0.05} {...F} />
      <rect x={0.4} y={h - 2.9} width={0.85} height={0.85} rx={0.15} {...F2} />
      <rect x={w - 1.25} y={h - 2.9} width={0.85} height={0.85} rx={0.15} {...F2} />
    </g>
  );
}
function Comedor({ r }: { r: Room }) {
  const { x, y, w, h } = r;
  const tw = 1.0, th = 2.4, tx = (w - tw) / 2, ty = (h - th) / 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={tx} y={ty} width={tw} height={th} rx={0.05} {...F} />
      {[0.3, 1.2, 2.1].map((v) => (<g key={v}><Circ cx={tx - 0.3} cy={ty + v} /><Circ cx={tx + tw + 0.3} cy={ty + v} /></g>))}
      <rect x={0.15} y={0.15} width={w - 0.3} height={0.4} {...F2} />
    </g>
  );
}
function Cocina({ r }: { r: Room }) {
  const { x, y, w, h } = r;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0.15} y={0.15} width={w - 0.3} height={0.62} {...F2} />
      <rect x={w - 0.8} y={0.15} width={0.65} height={0.65} {...F} />
      <circle cx={1.2} cy={0.46} r={0.13} {...F} /><circle cx={1.6} cy={0.46} r={0.13} {...F} />
      <rect x={w - 0.77} y={0.8} width={0.62} height={h * 0.5} {...F2} />
      <rect x={0.55} y={h * 0.42} width={Math.min(2.2, w - 1.1)} height={0.95} {...F} />
      {[0.4, 1.0, 1.6].filter((v) => v < w - 1.3).map((v) => <Circ key={v} cx={0.55 + v} cy={h * 0.42 + 1.25} r={0.17} />)}
    </g>
  );
}

/* ---------- exteriores ---------- */
const Car = ({ x, y, horizontal }: { x: number; y: number; horizontal?: boolean }) => (
  <g transform={`translate(${x} ${y})${horizontal ? " rotate(90)" : ""}`}>
    <rect x={0} y={0} width={2.0} height={4.4} rx={0.4} {...F2} />
    <rect x={0.2} y={0.9} width={1.6} height={0.8} rx={0.15} fill="none" stroke="#8A8175" strokeWidth={0.03} />
    <rect x={0.2} y={3.0} width={1.6} height={0.6} rx={0.15} fill="none" stroke="#8A8175" strokeWidth={0.03} />
  </g>
);

function Furniture({ room, doors, plan }: { room: Room; doors: Door[]; plan: Plan }) {
  const door = doors.find((d) => d.roomId === room.id);
  const back = OPP[doorSide(room, door)];
  const fr = frame(room, back);
  const wrap = (child: ReactNode) => <g key={room.id} transform={fr.t}>{child}</g>;
  void plan;
  switch (room.type) {
    case "dorm": return wrap(<Bedroom a={fr.a} b={fr.b} suite={false} />);
    case "suite": return wrap(<Bedroom a={fr.a} b={fr.b} suite />);
    case "bath": return wrap(<Bath a={fr.a} b={fr.b} id={room.id} />);
    case "vest": return wrap(<Vest a={fr.a} b={fr.b} />);
    case "office": return wrap(<Office a={fr.a} />);
    case "lav": return wrap(<Lav a={fr.a} />);
    case "desp": return wrap(<Desp a={fr.a} b={fr.b} />);
    case "tech": return wrap(<Tech a={fr.a} />);
    case "gym": return wrap(<Gym a={fr.a} b={fr.b} />);
    case "living": return <OpenLiving key={room.id} r={room} />;
    case "salon": return <Salon key={room.id} r={room} />;
    case "comedor": return <Comedor key={room.id} r={room} />;
    case "cocina": return <Cocina key={room.id} r={room} />;
    default: return null;
  }
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" "); const lines: string[] = []; let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars && cur) { lines.push(cur); cur = w; } else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
}

export function PlanSVG({ plan, furnished, label }: { plan: Plan; furnished: boolean; label: string }) {
  const { rooms, outdoor, doors, windows, bbox: bb, entry } = plan;
  const ox0 = Math.min(bb.x0, ...outdoor.map((o) => o.x));
  const oy1 = Math.max(bb.y1, ...outdoor.map((o) => o.y + o.h));
  const ox1 = Math.max(bb.x1, ...outdoor.map((o) => o.x + o.w));
  const vx = ox0 - 2.4, vy = bb.y0 - 2.4, vw = ox1 - ox0 + 4.4, vh = oy1 - bb.y0 + 4.6;
  const isLiv = (t: RoomType) => LIVING_FAMILY.includes(t);

  return (
    <svg viewBox={`${vx} ${vy} ${vw} ${vh}`} role="img" aria-label={label} className="h-auto w-full" style={{ background: PAPER }}>
      <defs>
        <pattern id="hatch" width="0.4" height="0.4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="0.4" stroke="#CFC5B1" strokeWidth="0.05" />
        </pattern>
      </defs>

      {/* exteriores */}
      {outdoor.map((o, i) => (
        <g key={i}>
          {o.kind === "porch" && <rect x={o.x} y={o.y} width={o.w} height={o.h} fill="url(#hatch)" stroke="#B9AE99" strokeWidth={0.05} strokeDasharray="0.2 0.12" />}
          {o.kind === "pool" && (<g><rect x={o.x} y={o.y} width={o.w} height={o.h} rx={0.15} fill="#DCE6E4" stroke={INK} strokeWidth={0.1} /><rect x={o.x + 0.25} y={o.y + 0.25} width={o.w - 0.5} height={o.h - 0.5} rx={0.1} fill="none" stroke="#9DB5B1" strokeWidth={0.05} /></g>)}
          {o.kind === "poolReady" && <rect x={o.x} y={o.y} width={o.w} height={o.h} rx={0.15} fill="none" stroke="#9DB5B1" strokeWidth={0.07} strokeDasharray="0.25 0.15" />}
          {o.kind === "carport" && (<g><rect x={o.x} y={o.y} width={o.w} height={o.h} fill="none" stroke="#8A8175" strokeWidth={0.06} strokeDasharray="0.3 0.15" />{[[0, 0], [o.w - 0.3, 0], [0, o.h - 0.3], [o.w - 0.3, o.h - 0.3]].map(([dx, dy], k) => <rect key={k} x={o.x + dx} y={o.y + dy} width={0.3} height={0.3} fill={INK} />)}</g>)}
          {o.kind === "garage" && <rect x={o.x} y={o.y} width={o.w} height={o.h} fill="#EDE8DD" stroke={INK} strokeWidth={0.18} />}
          <text x={o.x + o.w / 2} y={o.y + o.h - 0.3} textAnchor="middle" fontSize={0.34} fill="#6E665C" style={{ letterSpacing: "0.02em" }}>
            {o.name} · {Math.round(o.w * o.h)} m²
          </text>
          {furnished && (o.kind === "carport" || o.kind === "garage") && (<><Car x={o.x + 0.9} y={o.y + 0.7} /><Car x={o.x + o.w - 2.9} y={o.y + 0.7} /></>)}
          {furnished && o.kind === "porch" && (
            <g>
              <rect x={o.x + 1.5} y={o.y + 0.7} width={1.8} height={0.9} rx={0.05} {...F} />
              {[2.0, 2.8].map((v) => (<g key={v}><Circ cx={o.x + v} cy={o.y + 0.4} r={0.18} /><Circ cx={o.x + v} cy={o.y + 1.9} r={0.18} /></g>))}
              <rect x={o.x + o.w - 4.0} y={o.y + 0.5} width={0.75} height={1.9} rx={0.15} {...F2} />
              <rect x={o.x + o.w - 2.8} y={o.y + 0.5} width={0.75} height={1.9} rx={0.15} {...F2} />
            </g>
          )}
        </g>
      ))}

      {/* suelos */}
      {rooms.map((q) => <rect key={q.id} x={q.x} y={q.y} width={q.w} height={q.h} fill={FLOOR[q.type] ?? "#F3EFE6"} />)}

      {/* mobiliario */}
      {furnished && rooms.map((q) => <Furniture key={q.id} room={q} doors={doors} plan={plan} />)}

      {/* muros */}
      {rooms.map((q) => (
        <rect key={"w" + q.id} x={q.x} y={q.y} width={q.w} height={q.h} fill="none"
          stroke={isLiv(q.type) ? "#A89E8E" : INK} strokeWidth={isLiv(q.type) ? 0.035 : 0.14}
          strokeDasharray={isLiv(q.type) ? "0.12 0.1" : undefined} />
      ))}
      <rect x={bb.x0} y={bb.y0} width={bb.x1 - bb.x0} height={bb.y1 - bb.y0} fill="none" stroke={INK} strokeWidth={0.3} />

      {/* ventanas */}
      {windows.map((w, i) => (
        <g key={i}>
          <line x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2} stroke={PAPER} strokeWidth={0.34} />
          <line x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2} stroke="#7FA0A8" strokeWidth={w.big ? 0.14 : 0.1} />
        </g>
      ))}

      {/* puertas */}
      {doors.map((d, i) => {
        const hinge = d.a, swing = d.dir;
        const leaf = d.kind === "v" ? `M ${d.e} ${hinge} L ${d.e + swing * d.len} ${hinge}` : `M ${hinge} ${d.e} L ${hinge} ${d.e + swing * d.len}`;
        const arc = d.kind === "v"
          ? `M ${d.e + swing * d.len} ${hinge} A ${d.len} ${d.len} 0 0 ${swing === 1 ? 1 : 0} ${d.e} ${hinge + d.len}`
          : `M ${hinge} ${d.e + swing * d.len} A ${d.len} ${d.len} 0 0 ${swing === 1 ? 0 : 1} ${hinge + d.len} ${d.e}`;
        const gap = d.kind === "v"
          ? <line x1={d.e} y1={hinge} x2={d.e} y2={hinge + d.len} stroke={PAPER} strokeWidth={0.22} />
          : <line x1={hinge} y1={d.e} x2={hinge + d.len} y2={d.e} stroke={PAPER} strokeWidth={0.22} />;
        return (<g key={i}>{gap}<path d={leaf} stroke={INK} strokeWidth={0.05} fill="none" /><path d={arc} stroke="#8A8175" strokeWidth={0.03} fill="none" /></g>);
      })}
      {/* acceso principal */}
      <g>
        <line x1={entry.x} y1={bb.y0} x2={entry.x + entry.len} y2={bb.y0} stroke={PAPER} strokeWidth={0.34} />
        <path d={`M ${entry.x} ${bb.y0} L ${entry.x} ${bb.y0 - entry.len}`} stroke={INK} strokeWidth={0.06} />
        <path d={`M ${entry.x} ${bb.y0 - entry.len} A ${entry.len} ${entry.len} 0 0 1 ${entry.x + entry.len} ${bb.y0}`} stroke="#8A8175" strokeWidth={0.03} fill="none" />
        <text x={entry.x + entry.len + 0.3} y={bb.y0 - 0.35} fontSize={0.3} fill="#6E665C">Acceso</text>
      </g>

      {/* etiquetas */}
      {rooms.filter((q) => q.type !== "corridor").map((q) => {
        const tiny = q.w < 2.1 || q.h < 1.6;
        const max = Math.max(5, Math.floor((q.w - 0.2) / 0.16));
        const lines = tiny && q.type === "bath" ? ["Baño"] : tiny && q.type === "vest" ? ["Vest."] : tiny && q.type === "tech" ? ["Téc."] : wrapText(q.name, max);
        const showDims = !furnished && !tiny;
        const fs = tiny ? 0.24 : 0.3;
        const total = lines.length + (showDims ? 1 : 0) + 1;
        const topY = furnished ? q.y + 0.42 : q.y + q.h / 2 - (total * fs * 1.25) / 2 + fs;
        const cx = furnished ? q.x + 0.15 : q.x + q.w / 2;
        const anchor = furnished ? "start" : "middle";
        const halo = { paintOrder: "stroke" as const, stroke: PAPER, strokeWidth: 0.1, strokeLinejoin: "round" as const };
        if (furnished && (q.type === "bath" || q.type === "vest" || q.type === "tech" || q.type === "lav" || q.type === "desp")) return null;
        return (
          <text key={"t" + q.id} x={cx} y={topY} textAnchor={anchor} fontSize={fs} fill={INK} style={halo} fontWeight={500}>
            {lines.map((ln, i) => <tspan key={i} x={cx} dy={i === 0 ? 0 : fs * 1.25}>{ln}</tspan>)}
            {showDims && <tspan x={cx} dy={fs * 1.25} fill="#6E665C" fontSize={0.24}>{q.w.toFixed(1)} × {q.h.toFixed(1)} m</tspan>}
            <tspan x={cx} dy={fs * 1.25} fill="#6E665C" fontSize={0.24}>{q.area.toFixed(1)} m²</tspan>
          </text>
        );
      })}

      {/* cotas */}
      <g stroke="#6E665C" strokeWidth={0.04} fill="#6E665C" fontSize={0.36}>
        <line x1={bb.x0} y1={bb.y0 - 1.3} x2={bb.x1} y2={bb.y0 - 1.3} />
        <line x1={bb.x0} y1={bb.y0 - 1.5} x2={bb.x0} y2={bb.y0 - 1.1} /><line x1={bb.x1} y1={bb.y0 - 1.5} x2={bb.x1} y2={bb.y0 - 1.1} />
        <text x={(bb.x0 + bb.x1) / 2} y={bb.y0 - 1.45} textAnchor="middle" stroke="none">{plan.summary.W.toFixed(2).replace(".", ",")} m</text>
        <line x1={bb.x0 - 1.3} y1={bb.y0} x2={bb.x0 - 1.3} y2={bb.y1} />
        <line x1={bb.x0 - 1.5} y1={bb.y0} x2={bb.x0 - 1.1} y2={bb.y0} /><line x1={bb.x0 - 1.5} y1={bb.y1} x2={bb.x0 - 1.1} y2={bb.y1} />
        <text transform={`translate(${bb.x0 - 1.45} ${(bb.y0 + bb.y1) / 2}) rotate(-90)`} textAnchor="middle" stroke="none">{plan.summary.D.toFixed(2).replace(".", ",")} m</text>
      </g>
      {/* norte + escala */}
      <g transform={`translate(${ox1 + 1.2} ${bb.y0 - 0.9})`} fill={INK} fontSize={0.32}>
        <path d="M0 0.5 L0.22 -0.1 L0.44 0.5 L0.22 0.35 Z" /><text x={0.22} y={-0.25} textAnchor="middle">N</text>
      </g>
      <g transform={`translate(${ox1 - 2.4} ${oy1 + 1.6})`} fontSize={0.3} fill="#6E665C">
        <rect x={0} y={0} width={1} height={0.12} fill={INK} /><rect x={1} y={0} width={1} height={0.12} fill="#fff" stroke={INK} strokeWidth={0.03} />
        <text x={0} y={0.5}>0</text><text x={2} y={0.5} textAnchor="end">2 m</text>
      </g>
    </svg>
  );
}
