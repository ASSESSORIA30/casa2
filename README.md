# [NOMBRE MARCA] — vivienda industrializada de hormigón

Primer prototipo funcional en Next.js, TypeScript y Tailwind CSS.

## Arranque

```bash
npm install
npm run dev
```

## Cambios rápidos

- Marca, navegación y precios globales: `config/brand.ts`
- Modelos, nombres, superficies, descripciones, equipamiento y precios: `data/houses.ts`
- Los costes internos están en `data/houses.ts`, marcado como `server-only`; el navegador recibe solo `PublicHouse`.
- Sustituye los SVG de `public/renders/model-XX/` por renders definitivos manteniendo el mismo nombre de archivo.
- Los prompts de generación están en `data/houses.ts` y en `IMAGE-PROMPTS.md`.

## Producción

1. Completar datos legales y política RGPD.
2. Conectar `/api/contact` a CRM/email.
3. Sustituir especificaciones técnicas pendientes por datos del fabricante.
4. Sustituir renders conceptuales SVG por imágenes autorizadas/originales.
5. Revisar planos con arquitecto antes de publicación comercial.
