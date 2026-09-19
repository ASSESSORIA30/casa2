import { TECH_PENDING } from "@/config/site";

export const steps = [
  { n: "01", title: "Escoge tu modelo", text: "Siete diseños cerrados y optimizados. Sabes desde el primer día cómo será tu casa." },
  { n: "02", title: "Estudiamos tu parcela", text: "Analizamos orientación, topografía y condicionantes para ubicar tu vivienda." },
  { n: "03", title: "Adaptación técnica y licencias", text: "Preparamos el proyecto y gestionamos la documentación técnica y urbanística." },
  { n: "04", title: "Cimentación", text: "Ejecutamos la cimentación mientras tu casa ya se está fabricando." },
  { n: "05", title: "Fabricación industrializada", text: "Producción en fábrica, con control de calidad y plazos previsibles." },
  { n: "06", title: "Montaje y finalización", text: "Montaje en parcela, instalaciones, acabados y equipamiento completo." },
  { n: "07", title: "Te entregamos las llaves", text: "Entras a vivir. Todo instalado, montado y funcionando." },
];

export const noTienes = [
  "No tienes que diseñar una casa desde cero.",
  "No tienes que escoger cientos de materiales.",
  "No tienes que coordinar industriales.",
  "No tienes que comprar los muebles después.",
];

export const deliverStates = [
  { title: "Construida", text: "Estructura de hormigón industrializado, cerramientos e instalaciones." },
  { title: "Terminada", text: "Suelos, paredes, carpinterías, baños y acabados interiores completos." },
  { title: "Equipada", text: "Cocina, electrodomésticos, climatización e iluminación instalados." },
  { title: "Amueblada", text: "Sofá, mesa, sillas, camas, colchones, armarios… listos para usar." },
];

export const advantages = [
  { title: "Sin meses de decisiones", text: "Modelos cerrados y previamente optimizados: no hay que decidir cientos de detalles." },
  { title: "Sin costes imprevistos", text: "Producto definido, alcance claro y precio cerrado por modelo." },
  { title: "Sin incompatibilidades", text: "Cada solución está diseñada, probada y coordinada de antemano." },
  { title: "Plazos más cortos", text: "La fabricación industrializada avanza en paralelo a la cimentación." },
  { title: "Calidad constante", text: "Producción en entorno controlado, con procesos repetibles." },
  { title: "Una sola responsabilidad", text: "Un único interlocutor de principio a fin." },
];

export const comparison = [
  ["Diseñar desde cero", "Escoger un modelo terminado"],
  ["Cientos de decisiones", "Packs de acabados predefinidos"],
  ["Varios industriales y coordinación", "Un único interlocutor"],
  ["Presupuesto abierto", "Producto y precio definidos"],
  ["Muebles y equipamiento aparte", "Vivienda equipada y amueblada"],
];

export interface EquipCategory { id: string; title: string; text: string; items: string[] }
export const equipment: EquipCategory[] = [
  { id: "cocina", title: "Cocina", text: "Cocina completa, diseñada para vivir y para cocinar.", items: ["Mobiliario de cocina completo", "Encimera de porcelánico o piedra", "Isla o península (según modelo)", "Grifería y fregadero", "Iluminación integrada"] },
  { id: "electrodomesticos", title: "Electrodomésticos", text: "Todo instalado y funcionando desde el primer día.", items: ["Frigorífico", "Horno", "Placa de cocción", "Campana", "Lavavajillas", "Lavadora (y secadora según modelo)"] },
  { id: "salon", title: "Salón", text: "Espacio de estar y comedor amueblado.", items: ["Sofá", "Mesa de comedor y sillas", "Mueble de salón", "Alfombra", "Cortinas y estores"] },
  { id: "dormitorios", title: "Dormitorios", text: "Dormitorios completos, listos para dormir.", items: ["Camas y colchones", "Mesitas de noche", "Armarios empotrados", "Vestidor (según modelo)", "Ropa de cama básica"] },
  { id: "banos", title: "Baños", text: "Baños completos con acabados de gama alta.", items: ["Sanitarios suspendidos", "Mueble de lavabo con espejo", "Plato de ducha o bañera", "Mampara", "Grifería empotrada (según modelo)"] },
  { id: "climatizacion", title: "Climatización", text: "Confort térmico durante todo el año.", items: ["Sistema de climatización", "Ventilación", "Agua caliente sanitaria", "Suelo radiante (según modelo)"] },
  { id: "iluminacion", title: "Iluminación", text: "Iluminación cálida, integrada y sin excesos.", items: ["Iluminación interior LED", "Puntos de luz decorativos", "Iluminación exterior de porche y accesos"] },
  { id: "domotica", title: "Domótica", text: "Control sencillo de la vivienda.", items: ["Control de iluminación", "Control de clima", "Persianas motorizadas (según modelo)", "Videoportero"] },
  { id: "exterior", title: "Exterior", text: "Del porche al jardín, resuelto.", items: ["Mobiliario de porche", "Pavimento perimetral", "Jardín de bajo mantenimiento (pack)", "Piscina (según modelo / pack)"] },
];

export const techFields = [
  { label: "Composición de paredes", value: null },
  { label: "Aislamiento", value: null },
  { label: "Transmitancia térmica", value: null },
  { label: "Carpinterías", value: null },
  { label: "Climatización", value: null },
  { label: "Aerotermia", value: null },
  { label: "Eficiencia energética", value: null },
  { label: "Estructura", value: null },
  { label: "Cubierta", value: null },
  { label: "Instalaciones", value: null },
] as { label: string; value: string | null }[];
export const techValue = (v: string | null) => v ?? TECH_PENDING;

export const packDetail: Record<string, string> = {
  esencial: "Equipamiento esencial completo: cocina, electrodomésticos, baños, climatización y mobiliario principal.",
  confort: "Equipamiento confort: incluye más almacenaje, iluminación decorativa y mobiliario de porche.",
  premium: "Equipamiento premium: acabados superiores, vestidor equipado, domótica básica y mobiliario exterior.",
  signature: "Equipamiento Signature: selección de materiales y mobiliario de gama más alta, domótica integral y equipamiento del espacio polivalente.",
};

export const materials = [
  { name: "Hormigón", text: "Estructura y volumen arquitectónico." },
  { name: "Roble y nogal", text: "Carpintería, suelos y mobiliario." },
  { name: "Piedra natural", text: "Revestimientos, encimeras y detalles." },
  { name: "Microcemento", text: "Continuidad en suelos y paramentos." },
  { name: "Porcelánico gran formato", text: "Baños, cocina y exteriores." },
  { name: "Tejidos naturales", text: "Lino, algodón y lana en tonos arena." },
];

export const provinces = ["A Coruña","Álava","Albacete","Alicante","Almería","Asturias","Ávila","Badajoz","Baleares","Barcelona","Burgos","Cáceres","Cádiz","Cantabria","Castellón","Ciudad Real","Córdoba","Cuenca","Girona","Granada","Guadalajara","Gipuzkoa","Huelva","Huesca","Jaén","La Rioja","Las Palmas","León","Lleida","Lugo","Madrid","Málaga","Murcia","Navarra","Ourense","Palencia","Pontevedra","Salamanca","Santa Cruz de Tenerife","Segovia","Sevilla","Soria","Tarragona","Teruel","Toledo","Valencia","Valladolid","Bizkaia","Zamora","Zaragoza","Ceuta","Melilla"];

export const seoKeywords = "casas industrializadas de hormigón, casas de hormigón llave en mano, casas modernas llave en mano, viviendas industrializadas, casas modulares premium, casas completamente equipadas, casa lista para vivir";
