import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ADMIN_PREVIEW } from "@/config/site";
import { getHouses } from "@/lib/houses";
import { houseImage, IMAGE_KINDS, imagePrompt } from "@/lib/images";

export const metadata: Metadata = { title: "Imágenes pendientes", robots: { index: false, follow: false } };

/** Solo en desarrollo: lista de huecos de imagen, ruta donde colocar cada archivo y prompt de generación. */
export default function ImagePrompts() {
  if (!ADMIN_PREVIEW) notFound();
  const houses = getHouses();
  return (
    <div className="mx-auto max-w-4xl px-5 pb-40 pt-32">
      <h1 className="font-serif text-5xl font-light">Imágenes: rutas y prompts</h1>
      <p className="mt-4 text-warm-600">Coloca cada archivo en la ruta indicada (jpg, webp, png o avif). Si existe, sustituye automáticamente al render provisional. También puedes usar <code>public/images/site/hero.jpg</code>, <code>interior.jpg</code>, <code>cta.jpg</code>, <code>incluido-*.jpg</code> y <code>equip-*.jpg</code>.</p>
      {houses.map((h) => (
        <section key={h.slug} className="mt-14">
          <h2 className="font-serif text-3xl">{h.title}</h2>
          <ul className="mt-4 space-y-5">
            {IMAGE_KINDS.filter((k) => k.kind !== "pool" || h.pool !== "none").map((k) => (
              <li key={k.kind} className="border-t border-charcoal/10 pt-4 text-sm">
                <p><strong>{k.label}</strong> · <code>public/images/houses/{h.slug}/{k.kind}.jpg</code> · {houseImage(h.slug, k.kind) ? "✅ cargada" : "⏳ pendiente"}</p>
                <p className="mt-1 text-warm-600">{imagePrompt(k.kind, { surface: h.nominalSurface, pool: h.pool !== "none", garage: h.garage !== "none", floors: h.floors, code: h.code })}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
