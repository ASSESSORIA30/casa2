import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { PageHero, Section } from "@/components/ui";

const pages = {
  "aviso-legal": { title: "Aviso legal", body: ["Titular: " + site.legalEntity.name, "CIF: " + site.legalEntity.cif, "Datos registrales: " + site.legalEntity.registry, "Contacto: " + site.contact.email, "Texto legal definitivo pendiente de redacción por el asesor jurídico (LSSI-CE)."] },
  privacidad: { title: "Política de privacidad", body: ["Responsable del tratamiento: " + site.legalEntity.name, "Finalidad: atender solicitudes de información sobre las viviendas.", "Base jurídica: consentimiento del interesado.", "Derechos: acceso, rectificación, supresión, oposición, limitación y portabilidad.", "Texto definitivo (RGPD/LOPDGDD) pendiente de redacción por el asesor jurídico."] },
  cookies: { title: "Política de cookies", body: ["Esta versión de la web solo utiliza cookies técnicas estrictamente necesarias.", "Si se añaden analítica o publicidad, será necesario un banner de consentimiento.", "Texto definitivo pendiente de redacción."] },
} as const;

export function generateStaticParams() { return Object.keys(pages).map((slug) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = pages[params.slug as keyof typeof pages];
  return p ? { title: p.title, robots: { index: false } } : {};
}
export default function Legal({ params }: { params: { slug: string } }) {
  const p = pages[params.slug as keyof typeof pages];
  if (!p) notFound();
  return (<><PageHero eyebrow="Legal" title={p.title} /><Section><div className="mx-auto max-w-2xl space-y-4 text-warm-600">{p.body.map((t) => <p key={t}>{t}</p>)}<p className="text-sm italic">Página provisional (placeholder).</p></div></Section></>);
}
