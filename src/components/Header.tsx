"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/config/site";

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overHero = path === "/" || path.startsWith("/modelos/");
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const light = overHero && !scrolled && !open;
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${light ? "bg-transparent text-ivory" : "bg-ivory/90 text-charcoal shadow-[0_1px_0_rgba(36,33,30,.08)] backdrop-blur"}`}>
        <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:h-[84px] lg:px-14">
          <Link href="/" className="font-serif text-2xl font-normal tracking-[0.06em] sm:text-[28px]" aria-label={`${site.brandName} · inicio`}>
            {site.brandName}
          </Link>
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Principal">
            {site.nav.map((n) => (
              <Link key={n.href} href={n.href} className={`text-[11.5px] font-medium uppercase tracking-[0.16em] transition-opacity hover:opacity-60 ${path.startsWith(n.href) ? "underline decoration-bronze underline-offset-8" : ""}`}>{n.label}</Link>
            ))}
            <Link href="/contacto" className={`border px-6 py-3 text-[11.5px] font-medium uppercase tracking-[0.16em] transition-colors duration-500 ${light ? "border-ivory hover:bg-ivory hover:text-charcoal" : "border-charcoal hover:bg-charcoal hover:text-ivory"}`}>Contacto</Link>
          </nav>
          <button onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center lg:hidden" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>
            <span className="relative block h-3 w-7">
              <span className={`absolute left-0 h-px w-7 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-7 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </header>
      <div className={`fixed inset-0 z-40 bg-ivory px-6 pt-28 transition-all duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <nav className="flex flex-col" aria-label="Móvil">
          {[...site.nav, { href: "/contacto", label: "Contacto" }].map((n, i) => (
            <Link key={n.href} href={n.href} style={{ transitionDelay: `${open ? i * 50 : 0}ms` }}
              className={`border-b border-charcoal/10 py-4 font-serif text-3xl font-light text-charcoal transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>{n.label}</Link>
          ))}
        </nav>
        <p className="mt-10 text-sm text-warm-600">{site.tagline}</p>
      </div>
    </>
  );
}
