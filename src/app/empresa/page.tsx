import type { Metadata } from "next";
import { site } from "@/config/site";
import { Button, Eyebrow, H2, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Empresa: una nueva manera de acceder a una vivienda contemporánea",
  description: "Una nueva marca de viviendas de arquitectura contemporánea: diseñadas, industrializadas, equipadas y preparadas para vivir.",
  alternates: { canonical: "/empresa" },
};
const values = [
  ["Diseño", "Arquitectura contemporánea mediterránea, sobria y atemporal."],
  ["Calidad", "Materiales nobles y procesos industriales controlados."],
  ["Claridad", "Modelos cerrados, alcance definido y precio claro."],
  ["Tranquilidad", "Un solo interlocutor, de la elección a las llaves."],
];
export default function Empresa() {
  return (
    <>
      <PageHero eyebrow="La marca" title={<>{site.brandName}</>} text="Una nueva manera de acceder a una vivienda de arquitectura contemporánea: diseñada, industrializada, equipada y preparada para vivir." />
      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div><Eyebrow>Nuestra idea</Eyebrow><H2>Comprar una casa,<br />no iniciar una obra.</H2></div>
          <div className="space-y-5 text-lg leading-relaxed text-warm-600">
            <p>Creemos que una vivienda de calidad no debería exigir meses de decisiones, coordinación de industriales ni presupuestos que cambian.</p>
            <p>Por eso diseñamos una colección de casas cerradas y optimizadas. Tú escoges el modelo; nosotros lo adaptamos a tu parcela, lo fabricamos, lo equipamos y te lo entregamos.</p>
          </div>
        </div>
      </Section>
      <Section tone="stone">
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">{values.map(([t, d]) => <div key={t} className="border-t border-charcoal/20 pt-6"><p className="font-serif text-3xl font-light">{t}</p><p className="mt-3 text-sm text-warm-600">{d}</p></div>)}</div>
        <div className="mt-16"><Button href="/contacto">Hablemos</Button></div>
      </Section>
    </>
  );
}
