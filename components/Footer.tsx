import Link from 'next/link';
import { BRAND, NAV } from '@/config/brand';

export default function Footer() {
  return (
    <footer className="bg-[#222421] text-[#f3efe7]">
      <div className="container-wide grid gap-14 py-16 md:grid-cols-[1.3fr_.7fr_.7fr] md:py-24">
        <div>
          <p className="eyebrow opacity-60">{BRAND.name}</p>
          <h2 className="mt-5 max-w-xl text-4xl leading-tight arch-serif md:text-6xl">Escoge tu casa.<br/>Nosotros hacemos el resto.</h2>
        </div>
        <div className="space-y-3 text-sm opacity-80">
          {NAV.map((item) => <Link key={item.href} href={item.href} className="block hover:opacity-60">{item.label}</Link>)}
          <Link href="/contacto" className="block hover:opacity-60">Contacto</Link>
        </div>
        <div className="space-y-3 text-sm opacity-80">
          <p>{BRAND.email}</p><p>{BRAND.phone}</p>
          <Link href="/legal/aviso-legal" className="block hover:opacity-60">Aviso legal</Link>
          <Link href="/legal/privacidad" className="block hover:opacity-60">Privacidad</Link>
        </div>
      </div>
      <div className="container-wide flex flex-col gap-2 border-t border-white/15 py-5 text-[10px] uppercase tracking-[.12em] opacity-50 md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} {BRAND.name}</span>
        <span>Vivienda industrializada · Arquitectura contemporánea</span>
      </div>
    </footer>
  );
}
