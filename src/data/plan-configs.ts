import { PlanConfig, r, col } from "@/lib/plan";

/**
 * Configuración geométrica de cada plano conceptual.
 * Unidades: metros. Los baños/dormitorios se apilan en columnas (ver lib/plan.ts).
 * Cambiar cotas aquí regenera automáticamente el plano, las puertas, ventanas y el cuadro de superficies.
 */
export const planConfigs: Record<string, PlanConfig> = {
  "90": {
    W: 13, D: 7, dw: 5.8, sh: 2.0, entryX: 0.7,
    service: [r("rec", "Recibidor", "hall", 2.4), r("lav", "Lavadero", "lav", 1.8), r("tec", "Espacio técnico", "tech", 1.6)],
    living: [r("sal", "Salón-comedor-cocina", "living", 5.8)],
    nh: 3.2,
    north: [col(2.8, [r("d3", "Dormitorio 3", "dorm")]), col(2.0, [r("b2", "Baño 2", "bath")]), col(2.4, [r("d2", "Dormitorio 2", "dorm")])],
    south: [col(2.2, [r("bs", "Baño suite", "bath", undefined, "suite")]), col(5.0, [r("suite", "Dormitorio principal", "suite")])],
    outdoor: [{ kind: "porch", name: "Porche", x: 0, y: 7, w: 7.5, h: 2.6 }],
  },
  "110": {
    W: 15, D: 7.4, dw: 7.4, sh: 2.2, entryX: 0.8,
    service: [r("rec", "Recibidor", "hall", 2.6), r("lav", "Lavadero", "lav", 2.2), r("desp", "Despensa", "desp", 2.6)],
    living: [r("sal", "Salón-comedor-cocina", "living", 7.4)],
    nh: 3.4,
    north: [col(2.8, [r("d2", "Dormitorio 2", "dorm")]), col(2.0, [r("b2", "Baño 2", "bath")]), col(2.8, [r("d3", "Dormitorio 3", "dorm")])],
    south: [col(2.0, [r("bs", "Baño suite", "bath", undefined, "suite")]), col(5.6, [r("suite", "Suite principal", "suite")])],
    outdoor: [{ kind: "porch", name: "Porche", x: 0, y: 7.4, w: 9, h: 3 }],
  },
  "130": {
    W: 15.5, D: 8.4, dw: 7.8, sh: 2.4, entryX: 0.8,
    service: [r("rec", "Recibidor", "hall", 2.6), r("lav", "Lavadero", "lav", 2.4), r("desp", "Despensa", "desp", 2.8)],
    living: [r("sal", "Salón-comedor-cocina", "living", 7.8)],
    nh: 3.3,
    north: [col(2.8, [r("d2", "Dormitorio 2", "dorm")]), col(1.8, [r("b2", "Baño 2", "bath")]), col(3.1, [r("d3", "Dormitorio 3", "dorm")])],
    south: [
      col(2.8, [r("d4", "Dormitorio 4", "dorm")]),
      col(1.8, [r("bs", "Baño suite", "bath", 2.1, "suite"), r("vest", "Vestidor", "vest", undefined, "suite")]),
      col(3.1, [r("suite", "Suite principal", "suite")]),
    ],
    outdoor: [{ kind: "porch", name: "Porche grande", x: 0, y: 8.4, w: 11, h: 3.6 }],
  },
  "150": {
    W: 17, D: 9, dw: 8.6, sh: 2.4, entryX: 0.8,
    service: [r("rec", "Recibidor", "hall", 2.8), r("lav", "Lavadero", "lav", 2.4), r("desp", "Despensa", "desp", 3.4)],
    living: [r("sal", "Salón-comedor-cocina", "living", 8.6)],
    nh: 3.5,
    north: [col(2.8, [r("d2", "Dormitorio 2", "dorm")]), col(1.8, [r("b2", "Baño 2", "bath")]), col(3.8, [r("d3", "Dormitorio 3", "dorm")])],
    south: [
      col(2.9, [r("d4", "Dormitorio 4", "dorm", 3.1), r("b3", "Baño 3", "bath", undefined, "d4")]),
      col(1.8, [r("bs", "Baño suite", "bath", 2.4, "suite"), r("vest", "Vestidor", "vest", undefined, "suite")]),
      col(3.7, [r("suite", "Suite principal", "suite")]),
    ],
    outdoor: [
      { kind: "porch", name: "Porche", x: 0, y: 9, w: 11, h: 3.2 },
      { kind: "poolReady", name: "Espacio preparado para piscina", x: 1.5, y: 12.6, w: 8, h: 4 },
    ],
  },
  "170": {
    W: 18.5, D: 9.2, dw: 8.8, sh: 2.6, entryX: 0.8,
    service: [r("rec", "Recibidor", "hall", 2.6), r("desp0", "Despacho", "office", 2.8), r("lav", "Lavadero", "lav", 1.7), r("desp", "Despensa", "desp", 1.7)],
    living: [r("sal", "Salón-comedor-cocina", "living", 8.8)],
    nh: 3.6,
    north: [col(2.8, [r("d2", "Dormitorio 2", "dorm")]), col(1.8, [r("b2", "Baño 2", "bath")]), col(3.0, [r("d3", "Dormitorio 3", "dorm")]), col(2.1, [r("tec", "Cuarto técnico", "tech")])],
    south: [
      col(2.9, [r("d4", "Dormitorio 4", "dorm", 3.1), r("b3", "Baño 3", "bath", undefined, "d4")]),
      col(2.0, [r("bs", "Baño suite", "bath", 2.4, "suite"), r("vest", "Vestidor", "vest", undefined, "suite")]),
      col(4.8, [r("suite", "Suite principal", "suite")]),
    ],
    outdoor: [
      { kind: "porch", name: "Porche muy amplio", x: 0, y: 9.2, w: 15, h: 3.4 },
      { kind: "pool", name: "Piscina", x: 2, y: 13.2, w: 9, h: 4 },
      { kind: "carport", name: "Marquesina 2 coches", x: -6.2, y: 0, w: 6.2, h: 5.6 },
    ],
  },
  "200": {
    W: 22, D: 9, dw: 11.2, sh: 2.8, entryX: 0.9,
    service: [r("rec", "Recibidor", "hall", 3.0), r("desp0", "Despacho", "office", 3.2), r("lav", "Lavadero", "lav", 2.5), r("desp", "Despensa", "desp", 2.5)],
    living: [r("sal", "Salón", "salon", 5.0), r("com", "Comedor", "comedor", 3.0), r("coc", "Cocina con isla", "cocina", 3.2)],
    nh: 3.6,
    north: [
      col(3.0, [r("d2", "Dormitorio 2", "dorm")]), col(2.0, [r("b2", "Baño 2", "bath")]),
      col(3.0, [r("d3", "Dormitorio 3", "dorm")]), col(2.8, [r("d4", "Dormitorio 4", "dorm")]),
    ],
    south: [
      col(2.4, [r("bs", "Baño suite", "bath", 2.2, "suite"), r("vest", "Vestidor", "vest", undefined, "suite")]),
      col(5.6, [r("suite", "Suite principal", "suite")]),
      col(2.8, [r("b3", "Baño 3", "bath", 2.2), r("tec", "Zona técnica", "tech")]),
    ],
    outdoor: [
      { kind: "porch", name: "Porche", x: 0, y: 9, w: 15, h: 3.5 },
      { kind: "pool", name: "Piscina", x: 3, y: 13.4, w: 10, h: 4.2 },
      { kind: "garage", name: "Garaje 2 coches", x: -6.6, y: 0, w: 6.6, h: 6.2 },
    ],
  },
  "240": {
    W: 25, D: 9.6, dw: 12.4, sh: 3.0, entryX: 0.9,
    service: [
      r("rec", "Recibidor", "hall", 3.2), r("desp0", "Despacho", "office", 3.4), r("lav", "Lavadero", "lav", 2.2),
      r("desp", "Despensa", "desp", 2.0), r("aseo", "Aseo", "bath", 1.6),
    ],
    living: [r("sal", "Salón", "salon", 6.0), r("com", "Comedor", "comedor", 3.2), r("coc", "Cocina premium con isla", "cocina", 3.2)],
    nh: 3.8,
    north: [
      col(3.0, [r("d2", "Dormitorio 2", "dorm")]), col(2.0, [r("b2", "Baño 2", "bath")]),
      col(3.0, [r("d3", "Dormitorio 3", "dorm")]), col(2.6, [r("d4", "Dormitorio 4", "dorm")]), col(2.0, [r("b3", "Baño 3", "bath")]),
    ],
    south: [
      col(2.8, [r("bs", "Baño suite", "bath", 2.4, "suite"), r("vest", "Vestidor amplio", "vest", undefined, "suite")]),
      col(6.0, [r("suite", "Gran suite principal", "suite")]),
      col(3.8, [r("gym", "Espacio polivalente / gimnasio", "gym", 3.0), r("tec", "Cuarto técnico", "tech")]),
    ],
    outdoor: [
      { kind: "porch", name: "Grandes porches", x: 0, y: 9.6, w: 20, h: 4 },
      { kind: "pool", name: "Piscina", x: 3, y: 14.2, w: 12, h: 4.5 },
      { kind: "garage", name: "Garaje 2 coches", x: -6.6, y: 0, w: 6.6, h: 6.2 },
    ],
  },
};
