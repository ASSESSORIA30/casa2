# [NOMBRE MARCA] — Web de viviendas industrializadas de hormigón

Next.js 14 · React · TypeScript · Tailwind. Listo para Vercel.

## Arrancar
    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Cambiar el nombre de la marca
Un único punto: `src/config/site.ts` (`brandName`) o variable de entorno `NEXT_PUBLIC_BRAND_NAME`.

## Precios
`src/config/site.ts` → `showPrices` (false = "Solicitar precio"). Los costes internos
(`manufacturerCost`, `foundationCost`, `internalCosts`, `margin`) viven en `src/data/houses.ts`
y nunca llegan al frontend: `src/lib/houses.ts` solo expone `retailPrice` si `showPrices=true`.

## Modelos y planos
- Datos: `src/data/houses.ts`. Geometría de planos: `src/data/plan-configs.ts`
  (los planos, cotas, puertas, ventanas y cuadro de superficies se regeneran solos).
- Añadir un 8º modelo: (1) entrada en houses.ts, (2) config en plan-configs.ts, (3) imágenes opcionales.

## Imágenes reales
Colocar en `public/images/houses/{slug}/{tipo}.jpg` (tipos: exterior-front, exterior-garden, pool, living,
kitchen, master-bedroom, master-bath) y `public/images/site/`. Mientras no existan se muestra un render
provisional. En desarrollo, `/admin/imagenes` lista rutas esperadas y el prompt de generación de cada imagen.
No usar fotografías de terceros sin autorización.

## Pendiente antes de producción
- Conectar `/api/contact` a Resend/SendGrid/CRM (ahora solo hace log).
- Textos legales (`/legal/*`) y datos de `legalEntity`: revisar con asesor jurídico.
- Ficha técnica (`techFields` en `src/data/content.ts`): rellenar con datos del fabricante.
- Dominio: `url` en site.ts.

## Despliegue
Importar el repositorio en Vercel (framework Next.js autodetectado).
