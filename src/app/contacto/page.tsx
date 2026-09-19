import type { Metadata } from "next";
import { site } from "@/config/site";
import { getHouses } from "@/lib/houses";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contacto: cuéntanos dónde quieres vivir",
  description: "Solicita información y estudiaremos tu parcela sin compromiso.",
  alternates: { canonical: "/contacto" },
};

export default function Contacto({ searchParams }: { searchParams: { modelo?: string } }) {
  const houses = getHouses();
  const def = houses.some((h) => h.slug === searchParams.modelo) ? searchParams.modelo! : "";
  return (
    <Section className="pt-36 sm:pt-44 lg:pt-48">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <div>
          <Eyebrow>Contacto</Eyebrow>
          <h1 className="font-serif text-5xl font-light leading-[1.02] sm:text-6xl">Cuéntanos dónde quieres vivir.</h1>
          <p className="mt-6 max-w-md text-warm-600">Escoge tu modelo y estudiaremos tu parcela. Sin compromiso.</p>
          <ul className="mt-10 space-y-2 text-sm text-warm-600"><li><a href={`mailto:${site.contact.email}`} className="underline">{site.contact.email}</a></li><li>{site.contact.phone}</li><li>{site.contact.address}</li></ul>
        </div>
        <ContactForm models={houses.map((h) => ({ slug: h.slug, title: h.title }))} defaultModel={def} />
      </div>
    </Section>
  );
}
