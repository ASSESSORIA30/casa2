'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BRAND, NAV } from '@/config/brand';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 concrete-header">
      <div className="container-wide flex h-[74px] items-center justify-between">
        <Link href="/" className="text-[13px] font-semibold tracking-[.16em] uppercase">{BRAND.name}</Link>
        <nav className="hidden items-center gap-7 xl:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-[11px] font-medium uppercase tracking-[.12em] opacity-70 transition hover:opacity-100">
              {item.label}
            </Link>
          ))}
          <Link href="/contacto" className="btn-ghost !min-h-[40px] !px-4">Contacto <ArrowUpRight size={14}/></Link>
        </nav>
        <button aria-label="Abrir menú" className="xl:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={24}/> : <Menu size={24}/>} 
        </button>
      </div>
      {open && (
        <div className="fixed inset-x-0 top-[74px] min-h-[calc(100svh-74px)] concrete-bg-light p-6 xl:hidden">
          <nav className="mt-8 flex flex-col">
            {NAV.map((item, index) => (
              <Link key={item.href} href={item.href} className="flex items-center justify-between border-t hairline py-5 text-2xl arch-serif">
                <span>{item.label}</span><span className="text-xs opacity-40">0{index + 1}</span>
              </Link>
            ))}
            <Link href="/contacto" className="btn-primary mt-8">Solicita información</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
