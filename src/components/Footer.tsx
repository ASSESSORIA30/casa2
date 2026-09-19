import Link from "next/link";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-charcoal px-5 pb-28 pt-20 text-ivory/80 sm:px-8 lg:px-14 lg:pb-14">
      <div className="mx-auto grid max-w-[1360px] gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-serif text-4xl font-light text-ivory">{site.brandName}</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{site.tagline} Arquitectura industrializada de hormigón, completamente equipada y preparada para vivir.</p>
        </div>
        <div>
          <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-sand">Explorar</p>
          <ul className="space-y-3 text-sm">
            {site.nav.map((n) => <li key={n.href}><Link className="hover:text-ivory" href={n.href}>{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-sand">Contacto</p>
          <ul className="space-y-3 text-sm">
            <li><a className="hover:text-ivory" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
            <li><a className="hover:text-ivory" href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>{site.contact.phone}</a></li>
            <li>{site.contact.address}</li>
            <li><Link className="text-sand hover:text-ivory" href="/contacto">Cuéntanos dónde quieres vivir →</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-sand">Legal</p>
          <ul className="space-y-3 text-sm">
            <li><Link className="hover:text-ivory" href="/legal/aviso-legal">Aviso legal</Link></li>
            <li><Link className="hover:text-ivory" href="/legal/privacidad">Política de privacidad</Link></li>
            <li><Link className="hover:text-ivory" href="/legal/cookies">Política de cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1360px] flex-col gap-3 border-t border-ivory/10 pt-8 text-xs text-ivory/50 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {site.brandName}. Todos los derechos reservados.</p>
        <p>Las imágenes y planos son orientativos y no constituyen documentación contractual.</p>
      </div>
    </footer>
  );
}
