/**
 * CATÁLOGO CENTRAL DE VIVIENDAS
 * -----------------------------------------------------------------
 * Para añadir una octava vivienda:
 *  1) añade una entrada aquí,
 *  2) añade su plano en src/data/plan-configs.ts (misma clave que `code`),
 *  3) (opcional) copia sus imágenes en public/images/houses/{slug}/ .
 * Dormitorios, baños, superficies y cotas se calculan solos a partir del plano.
 *
 * Nombres, superficies nominales y textos son PROVISIONALES.
 */
export type GarageType = "none" | "carport" | "garage";
export type PoolType = "none" | "ready" | "included";
export type EquipmentPack = "esencial" | "confort" | "premium" | "signature";

export interface HousePricing {
  /** INTERNOS: nunca se envían al frontend. */
  manufacturerCost: number | null;
  foundationCost: number | null;
  internalCosts: number | null;
  /** margen sobre coste, p. ej. 0.22 = 22 % */
  margin: number | null;
  /** Único dato que se muestra (si site.showPrices = true). Si es null se calcula con los costes. */
  retailPrice: number | null;
}

export interface HouseData {
  code: string;            // clave del plano y sufijo del nombre: "[MARCA] 130"
  slug: string;
  signature?: boolean;
  nominalSurface: number;
  floors: 1 | 2;
  garage: GarageType;
  pool: PoolType;
  pack: EquipmentPack;
  tagline: string;
  audience: string;
  description: string;
  concept: string;
  highlights: string[];
  features: string[];
  options: { title: string; items: string[] }[];
  pricing: HousePricing;
}

const noPrice: HousePricing = { manufacturerCost: null, foundationCost: null, internalCosts: null, margin: null, retailPrice: null };

const commonOptions = (extra: { title: string; items: string[] }[] = []) => [
  { title: "Pack de acabados", items: ["Arena · roble claro, microcemento arena, piedra clara", "Nogal · nogal, microcemento gris cálido, piedra oscura", "Carbón · acentos negros, roble ahumado, porcelánico grafito"] },
  { title: "Pack exterior", items: ["Pavimento perimetral y accesos", "Jardín mediterráneo de bajo mantenimiento", "Iluminación exterior"] },
  ...extra,
];

export const houseData: HouseData[] = [
  {
    code: "90", slug: "90", nominalSurface: 90, floors: 1, garage: "none", pool: "none", pack: "esencial",
    tagline: "Compacta, luminosa y completamente resuelta.",
    audience: "Parejas, familias pequeñas y segunda residencia.",
    description: "Tres dormitorios y dos baños en una sola planta, con un salón-comedor-cocina abierto que se prolonga en el porche. Un producto compacto, pero con la precisión y los acabados de una vivienda premium.",
    concept: "Una pieza horizontal, sencilla y muy bien proporcionada. Todo lo necesario a poca distancia: zona de día abierta al jardín y zona de noche recogida, con las instalaciones agrupadas en un único eje técnico.",
    highlights: ["Salón-comedor-cocina abierto de casi 30 m²", "Dormitorio principal con baño propio", "Lavadero y espacio técnico independientes", "Porche exterior integrado"],
    features: ["Una planta, sin barreras", "Zona de día y noche claramente separadas", "Instalaciones agrupadas para máxima eficiencia", "Amplios ventanales hacia el porche"],
    options: commonOptions(),
    pricing: noPrice,
  },
  {
    code: "110", slug: "110", nominalSurface: 110, floors: 1, garage: "none", pool: "none", pack: "esencial",
    tagline: "Zona de día generosa, noche en calma.",
    audience: "Parejas, familias y primera residencia.",
    description: "Tres dormitorios, suite principal y un salón-comedor-cocina de más de 35 m². Despensa y lavadero independientes y una separación muy clara entre la zona de día y la de noche.",
    concept: "El salón se convierte en el corazón de la casa y se abre por completo al porche. La zona de noche se recoge al este, con un distribuidor corto y la suite en el extremo más tranquilo.",
    highlights: ["Salón-comedor-cocina de +35 m²", "Suite principal con baño", "Despensa y lavadero", "Separación día / noche"],
    features: ["Una planta", "Recorridos cortos y sin pasillos largos", "Doble orientación en salón", "Porche cubierto de uso todo el año"],
    options: commonOptions(),
    pricing: noPrice,
  },
  {
    code: "130", slug: "130", nominalSurface: 130, floors: 1, garage: "none", pool: "none", pack: "confort",
    tagline: "El equilibrio perfecto. Nuestra vivienda más elegida.",
    audience: "Familias que buscan cuatro dormitorios en una sola planta.",
    description: "Cuatro dormitorios, suite con vestidor, un salón-comedor-cocina de más de 40 m² y un gran porche. Una distribución afinada al detalle: la vivienda más comercial de la colección.",
    concept: "Un volumen horizontal con el salón como gran sala abierta al jardín y un porche amplio que actúa como habitación exterior. La zona de noche se organiza alrededor de un distribuidor corto con baño compartido y suite al fondo.",
    highlights: ["4 dormitorios en una planta", "Suite principal con vestidor y baño", "Salón-comedor-cocina de ~42 m²", "Porche grande y despensa"],
    features: ["Distribución optimizada tras eliminar todo espacio perdido", "Suite alejada de la zona de actividad", "Cocina abierta con isla opcional", "Preparada para ampliar el jardín con piscina"],
    options: commonOptions([{ title: "Pack piscina", items: ["Piscina prefabricada o de obra (según parcela)", "Solárium y ducha exterior"] }]),
    pricing: noPrice,
  },
  {
    code: "150", slug: "150", nominalSurface: 150, floors: 1, garage: "none", pool: "ready", pack: "premium",
    tagline: "Primer paso hacia la gama alta.",
    audience: "Familias que quieren espacio, privacidad y vida al aire libre.",
    description: "Cuatro dormitorios y tres baños, suite con vestidor, un segundo dormitorio tipo suite, salón de casi 50 m², lavadero independiente y espacio ya preparado para piscina.",
    concept: "La casa se organiza en dos zonas nítidas. El salón, de doble altura visual gracias al techo continuo, mira al jardín; el ala de noche incorpora un dormitorio con baño propio para invitados o hijos mayores.",
    highlights: ["4 dormitorios · 3 baños", "Suite principal con vestidor", "Segundo dormitorio tipo suite", "Espacio preparado para piscina"],
    features: ["Salón-comedor-cocina de casi 50 m²", "Lavadero independiente", "Despensa amplia", "Diseño preparado para piscina"],
    options: commonOptions([{ title: "Pack piscina", items: ["Piscina desbordante o de líneas rectas", "Iluminación subacuática", "Cubierta / cobertor"] }]),
    pricing: noPrice,
  },
  {
    code: "170", slug: "170", nominalSurface: 170, floors: 1, garage: "carport", pool: "included", pack: "premium",
    tagline: "Vida entre el interior y el jardín.",
    audience: "Familias con vida social y necesidad de despacho o teletrabajo.",
    description: "Cuatro dormitorios, tres baños, suite grande con vestidor, despacho, un salón de más de 50 m², porche muy amplio, marquesina para dos coches y piscina integrada en la propuesta.",
    concept: "Un volumen largo y bajo que se extiende hacia el jardín. Marquesina, porche y piscina se leen como una única pieza de arquitectura, con el despacho junto al acceso para separar trabajo y vida familiar.",
    highlights: ["Despacho independiente", "Suite grande con vestidor", "Marquesina para 2 coches", "Piscina integrada en el proyecto"],
    features: ["Salón-comedor-cocina de 50-55 m²", "Porche muy amplio", "Cuarto técnico independiente", "Una planta"],
    options: commonOptions([{ title: "Pack piscina", items: ["Piscina integrada", "Solárium y ducha exterior", "Iluminación exterior escénica"] }, { title: "Pack marquesina", items: ["Punto de recarga de vehículo eléctrico", "Cerramiento lateral de lamas"] }]),
    pricing: noPrice,
  },
  {
    code: "200", slug: "200", nominalSurface: 200, floors: 1, garage: "garage", pool: "included", pack: "premium",
    tagline: "Gran arquitectura para vivir despacio.",
    audience: "Quienes buscan una vivienda de gama alta con espacios diferenciados.",
    description: "Salón, comedor y cocina con gran isla como espacios diferenciados y a la vez conectados; suite premium con vestidor, despacho, garaje para dos coches, porche y piscina.",
    concept: "La casa se ordena de oeste a este: acceso y garaje, zona social y ala de noche. Todas las estancias principales se abren al jardín, con un porche continuo que enlaza salón, comedor y piscina.",
    highlights: ["Salón, comedor y cocina con isla", "Suite premium con vestidor", "Garaje 2 coches y despacho", "Porche y piscina"],
    features: ["Zona técnica independiente", "Tres baños completos", "Cocina con gran isla", "Distribución adaptable a formato en L alrededor del jardín (según parcela)"],
    options: commonOptions([{ title: "Pack piscina", items: ["Piscina desbordante", "Solárium y ducha exterior", "Cocina de verano exterior"] }, { title: "Pack domótica", items: ["Control de iluminación, clima y persianas", "Videoportero y control de accesos"] }]),
    pricing: noPrice,
  },
  {
    code: "240", slug: "240", signature: true, nominalSurface: 240, floors: 1, garage: "garage", pool: "included", pack: "signature",
    tagline: "La casa que define la marca.",
    audience: "Quienes buscan la máxima expresión de la colección.",
    description: "Cuatro dormitorios (ampliable a cinco), cuatro baños, gran suite con vestidor amplio, despacho, salón, comedor, cocina premium con isla, espacio polivalente / gimnasio, grandes porches, piscina y garaje para dos coches.",
    concept: "El modelo Signature reúne todo lo que la marca sabe hacer: proporciones generosas, luz natural en cada estancia y una relación continua entre interior y jardín. Es la imagen aspiracional de la colección.",
    highlights: ["Gran suite con vestidor amplio", "Espacio polivalente / gimnasio", "Cocina premium con isla", "Grandes porches, piscina y garaje"],
    features: ["4 baños · 4 dormitorios (5 opcional)", "Cuarto técnico independiente", "Despacho", "Posible desarrollo en dos plantas (estudio específico)"],
    options: commonOptions([{ title: "Pack piscina", items: ["Piscina desbordante de gran formato", "Solárium, ducha y cocina exterior"] }, { title: "Pack domótica", items: ["Control integral de la vivienda", "Sonido multiroom"] }, { title: "Pack bienestar", items: ["Sauna o zona spa exterior", "Equipamiento del espacio polivalente"] }]),
    pricing: noPrice,
  },
];
