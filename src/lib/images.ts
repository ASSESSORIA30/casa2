import fs from "node:fs";
import path from "node:path";

/** Carpeta donde sustituir/añadir imágenes reales: /public/images/houses/{slug}/{kind}.jpg */
export type ImageKind =
  | "exterior-front" | "exterior-garden" | "pool" | "living" | "kitchen" | "master-bedroom" | "master-bath";

export const IMAGE_KINDS: { kind: ImageKind; label: string }[] = [
  { kind: "exterior-front", label: "Exterior frontal" },
  { kind: "exterior-garden", label: "Fachada posterior y jardín" },
  { kind: "pool", label: "Piscina" },
  { kind: "living", label: "Salón" },
  { kind: "kitchen", label: "Cocina" },
  { kind: "master-bedroom", label: "Dormitorio principal" },
  { kind: "master-bath", label: "Baño principal" },
];

const EXT = ["jpg", "jpeg", "webp", "png", "avif"];

/** Devuelve la ruta pública si existe el archivo en /public, o null. */
export function findImage(relDir: string, name: string): string | null {
  for (const ext of EXT) {
    const rel = `${relDir}/${name}.${ext}`;
    try {
      if (fs.existsSync(path.join(process.cwd(), "public", rel))) return `/${rel}`;
    } catch { /* noop */ }
  }
  return null;
}
export const houseImage = (slug: string, kind: ImageKind) => findImage(`images/houses/${slug}`, kind);
export const siteImage = (name: string) => findImage("images/site", name);

const STYLE =
  "photorealistic architectural visualization, natural light, editorial architecture photography, 35mm, high dynamic range, quiet luxury, no people, no text, no logos";

const BASE =
  "contemporary Mediterranean single-family villa in exposed architectural concrete, long horizontal volumes, flat slim roof slab, floor-to-ceiling glazing with slim black frames, deep covered porch, natural stone cladding panels, oak timber soffits, sand and warm grey tones, Mediterranean garden with olive trees, cypress and gravel";

export function imagePrompt(kind: ImageKind, opts: { surface: number; pool: boolean; garage: boolean; floors: number; code: string }): string {
  const size = `approx. ${opts.surface} m² ${opts.floors === 1 ? "single-storey" : "two-storey"}`;
  const extras = [opts.pool ? "infinity-edge pool with pale stone coping" : "", opts.garage ? "integrated garage / carport for two cars" : ""].filter(Boolean).join(", ");
  switch (kind) {
    case "exterior-front":
      return `Front elevation at golden hour of a ${BASE}, ${size}${extras ? ", " + extras : ""}, wide-angle, slightly low viewpoint, ${STYLE}.`;
    case "exterior-garden":
      return `Rear garden view of a ${BASE}, ${size}, large sliding glass doors opening onto the terrace, outdoor dining area, ${extras || "landscaped lawn and gravel paths"}, late afternoon light, ${STYLE}.`;
    case "pool":
      return `Pool terrace view of a ${BASE}, ${size}, still turquoise-grey water reflecting the concrete facade, teak loungers, dusk with warm interior lights, ${STYLE}.`;
    case "living":
      return `Interior of an open-plan living-dining space in a Mediterranean contemporary villa, quiet luxury, microcement floor, oak and walnut joinery, natural stone fireplace wall, bouclé sofa in sand tones, linen curtains, large sliding glazing to a shaded porch, warm indirect lighting, black used only as small accents, ${STYLE}.`;
    case "kitchen":
      return `Premium kitchen with a large stone island, oak cabinetry, integrated appliances, large-format porcelain worktop, slim brass details, pendant lights, view to the garden, sand and warm grey palette, quiet luxury, ${STYLE}.`;
    case "master-bedroom":
      return `Master bedroom in a Mediterranean contemporary concrete villa, upholstered bed in natural linen, walnut headboard panel, nightstands, sheer curtains, glazing to the garden, soft morning light, beige and warm grey, quiet luxury, ${STYLE}.`;
    case "master-bath":
      return `Master bathroom with freestanding stone bathtub, floating oak vanity, large-format porcelain walls, microcement, walk-in shower with black frame accent, soft daylight, spa-like calm, quiet luxury, ${STYLE}.`;
  }
}
