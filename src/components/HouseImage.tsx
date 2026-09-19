import { RenderImage } from "./RenderImage";
import { houseImage, IMAGE_KINDS, ImageKind, siteImage } from "@/lib/images";
import type { PublicHouse } from "@/lib/houses";

/** Muestra la imagen real si existe en /public/images/houses/{slug}/{kind}.jpg; si no, un render provisional. */
export function HouseImage({ house, kind, className = "", sizes, priority }: { house: PublicHouse; kind: ImageKind; className?: string; sizes?: string; priority?: boolean }) {
  const label = IMAGE_KINDS.find((k) => k.kind === kind)!.label;
  return (
    <RenderImage
      src={houseImage(house.slug, kind)}
      alt={`${house.title} · ${label}`}
      className={className}
      sizes={sizes}
      priority={priority}
      label={`Render provisional · ${label}`}
      scene={{ kind, scale: house.nominalSurface / 240, pool: house.pool !== "none", garage: house.garage !== "none", seed: Number(house.code) % 7 }}
    />
  );
}

/** Imágenes generales del sitio: /public/images/site/{name}.jpg */
export function SiteImage({ name, alt, kind = "exterior-front", scale = 0.85, pool = true, className = "", sizes, priority }: { name: string; alt: string; kind?: ImageKind; scale?: number; pool?: boolean; className?: string; sizes?: string; priority?: boolean }) {
  return <RenderImage src={siteImage(name)} alt={alt} className={className} sizes={sizes} priority={priority} label="Imagen provisional" scene={{ kind, scale, pool, garage: false, seed: name.length }} />;
}
