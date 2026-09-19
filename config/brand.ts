export const BRAND = {
  name: '[NOMBRE MARCA]',
  shortName: '[NOMBRE MARCA]',
  claim: 'Escoge tu casa. Nosotros hacemos el resto.',
  legalName: '[RAZÓN SOCIAL PENDIENTE]',
  email: 'info@nombre-marca.es',
  phone: '+34 000 000 000',
  showPrices: false,
  locale: 'es-ES',
  currency: 'EUR',
  social: {
    instagram: '#',
    linkedin: '#',
  },
} as const;

export const NAV = [
  { href: '/modelos', label: 'Modelos' },
  { href: '/todo-incluido', label: 'Todo incluido' },
  { href: '/como-funciona', label: 'Cómo funciona' },
  { href: '/tecnologia', label: 'Tecnología' },
  { href: '/equipamiento', label: 'Equipamiento' },
  { href: '/empresa', label: 'Empresa' },
] as const;
