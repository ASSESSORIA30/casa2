# Prompts de renders — [NOMBRE MARCA]

Estos prompts están pensados para sustituir los SVG conceptuales de `public/renders/model-XX/` por renders originales. Mantener siempre el mismo lenguaje visual para toda la colección.

## Dirección visual común

**Base prompt**

> Photorealistic contemporary Mediterranean concrete villa, quiet luxury, warm limestone, natural oak, large floor-to-ceiling glazing, soft sand palette, subtle charcoal accents, native Mediterranean landscaping, architectural photography, realistic materials, premium but understated, no logos, no text, no excessive decoration, coherent collection identity, 35mm architectural lens, soft late-afternoon light.

**Interiores**: natural oak and walnut, warm limestone, microcement, large-format porcelain, linen and wool textiles, beige/sand/warm-grey palette, black only as a small accent, diffuse daylight, warm indirect lighting, uncluttered styling.

## Modelo 01 · 90 m²
- `front`: compact single-storey villa, sheltered entrance, horizontal concrete roof, one warm timber screen.
- `rear`: covered terrace directly connected to open living room, modest Mediterranean garden.
- `living`: compact premium open-plan living room, low modular sofa, natural textiles.
- `kitchen`: compact oak kitchen, light stone worktop, integrated appliances.
- `bedroom`: serene principal bedroom with oak headboard and linen.
- `bathroom`: walk-in shower, warm stone porcelain, floating vanity.

## Modelo 02 · 110 m²
- `front`: long horizontal single-storey villa, recessed entrance, clear day/night wings.
- `rear`: deep shaded porch, wide sliding glazing.
- `living`: open 35–38 m² living/dining room, direct garden axis.
- `kitchen`: peninsula kitchen, oak and warm stone.
- `bedroom`: principal suite opening to a private garden strip.
- `bathroom`: calm spa-like bathroom, warm mineral textures.

## Modelo 03 · 130 m²
- `front`: balanced family villa, strong horizontal canopy, elegant but highly commercial.
- `rear`: broad covered porch across living area, generous lawn.
- `living`: 42–45 m² open living/dining space, strong indoor-outdoor continuity.
- `kitchen`: large island, natural oak, pale stone, hidden appliances.
- `bedroom`: principal suite with compact walk-in closet.
- `bathroom`: double vanity, walk-in shower, quiet luxury.

## Modelo 04 · 150 m²
- `front`: premium single-storey villa, layered concrete volumes, refined stone accents.
- `rear`: oversized shaded porch, landscape prepared for a future pool.
- `living`: 48+ m² social space, sculptural but understated furniture.
- `kitchen`: large island, walnut details, limestone worktop.
- `bedroom`: generous suite with dressing area.
- `bathroom`: double vanity and large shower, large-format warm stone.

## Modelo 05 · 170 m²
- `front`: horizontal villa with two-car carport integrated into architecture.
- `rear`: very wide porch facing garden.
- `pool`: pool integrated parallel to terrace, shaded lounge.
- `living`: 50–55 m² living/dining, seamless terrace connection.
- `kitchen`: large central island, oak and limestone.
- `bedroom`: large principal suite, dressing room, direct garden opening.
- `bathroom`: premium bathroom, stone and microcement, calm resort feel.

## Modelo 06 · 200 m²
- `front`: L-shaped high-end concrete villa, integrated two-car garage, understated entrance court.
- `rear`: courtyard garden framed by both wings of the L.
- `pool`: long pool aligned with covered porch, architectural reflections.
- `living`: gallery-like living room with deep low sofa and large glazing.
- `kitchen`: separate dining and large island kitchen, sculptural stone.
- `bedroom`: premium principal suite, extensive glazing and dressing room.
- `bathroom`: spa bathroom, double vanity, natural stone.

## Modelo 07 Signature · 230–250 m²
- `front`: monumental but understated U-shaped signature villa, floating roof planes, integrated two-car garage, cinematic approach.
- `rear`: architecture framing a central garden and pool, very wide covered terraces.
- `pool`: long signature pool at sunset, water reflections, quiet resort atmosphere.
- `living`: large gallery-like salon, travertine, oak, sculptural furniture, minimal styling.
- `kitchen`: signature island kitchen, walnut, natural stone, hidden pantry door.
- `bedroom`: grand principal suite with sitting area and dressing room beyond.
- `bathroom`: spa-like principal bathroom, freestanding tub, double shower, warm stone.

## Sustitución de archivos

Conservar los nombres existentes (`front`, `rear`, `pool`, `living`, `kitchen`, `bedroom`, `bathroom`) para no tocar código. Se pueden sustituir los `.svg` por `.webp` o `.avif` actualizando únicamente las rutas de imágenes de cada modelo en `data/houses.ts`.
