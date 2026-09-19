/**
 * CONFIGURACIÓN GLOBAL DE MARCA
 * -----------------------------------------------------------------
 * El nombre de marca se cambia AQUÍ (o con la variable de entorno
 * NEXT_PUBLIC_BRAND_NAME) y se actualiza en toda la web.
 */
export const site = {
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME ?? "[NOMBRE MARCA]",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ejemplo.com",
  tagline: "Escoge tu casa. Nosotros hacemos el resto.",
  description:
    "Viviendas industrializadas de hormigón de arquitectura contemporánea, entregadas terminadas, equipadas y amuebladas. Escoge tu modelo y entra a vivir.",
  locale: "es_ES",

  /** Interruptor único de precios. false → “Solicitar precio”. */
  showPrices: false,

  contact: {
    email: "info@ejemplo.com",
    phone: "+34 900 000 000",
    address: "Dirección pendiente · España",
  },
  /** Textos legales: completar con los datos reales de la sociedad. */
  legalEntity: {
    name: "[RAZÓN SOCIAL PENDIENTE]",
    cif: "[CIF PENDIENTE]",
    registry: "[DATOS REGISTRALES PENDIENTES]",
  },
  nav: [
    { href: "/modelos", label: "Modelos" },
    { href: "/todo-incluido", label: "Todo incluido" },
    { href: "/como-funciona", label: "Cómo funciona" },
    { href: "/tecnologia", label: "Tecnología" },
    { href: "/equipamiento", label: "Equipamiento" },
    { href: "/empresa", label: "Empresa" },
  ],
} as const;

export const TECH_PENDING = "Información técnica pendiente de especificación del fabricante.";
export const PLAN_DISCLAIMER = "Distribución orientativa sujeta a adaptación técnica, urbanística y estructural.";
export const ADMIN_PREVIEW = process.env.NODE_ENV !== "production";
