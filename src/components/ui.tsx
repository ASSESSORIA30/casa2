import Link from "next/link";
import type { ReactNode } from "react";

export const Eyebrow = ({ children, light }: { children: ReactNode; light?: boolean }) => (
  <p className={`mb-5 text-[11px] font-medium uppercase tracking-[0.22em] ${light ? "text-sand" : "text-bronze-dark"}`}>{children}</p>
);
export const H2 = ({ children, light, className = "" }: { children: ReactNode; light?: boolean; className?: string }) => (
  <h2 className={`font-serif text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl ${light ? "text-ivory" : "text-charcoal"} ${className}`}>{children}</h2>
);
export const Section = ({ children, className = "", id, tone = "ivory" }: { children: ReactNode; className?: string; id?: string; tone?: "ivory" | "stone" | "charcoal" }) => (
  <section id={id} className={`px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36 ${tone === "stone" ? "bg-stone-50" : tone === "charcoal" ? "bg-charcoal text-ivory" : "bg-ivory"} ${className}`}>
    <div className="mx-auto max-w-[1360px]">{children}</div>
  </section>
);
type BtnProps = { href: string; children: ReactNode; variant?: "solid" | "outline" | "light" | "ghost"; className?: string };
export const Button = ({ href, children, variant = "solid", className = "" }: BtnProps) => {
  const v = {
    solid: "bg-charcoal text-ivory hover:bg-bronze-dark",
    outline: "border border-charcoal/70 text-charcoal hover:bg-charcoal hover:text-ivory",
    light: "bg-ivory text-charcoal hover:bg-sand",
    ghost: "border border-ivory/70 text-ivory hover:bg-ivory hover:text-charcoal",
  }[variant];
  return (
    <Link href={href} className={`inline-flex min-h-[52px] items-center justify-center px-8 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-500 ${v} ${className}`}>
      {children}
    </Link>
  );
};
export const PageHero = ({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: string }) => (
  <header className="bg-stone-50 px-5 pb-16 pt-36 sm:px-8 sm:pb-24 sm:pt-44 lg:px-14">
    <div className="mx-auto max-w-[1360px]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="max-w-4xl font-serif text-5xl font-light leading-[1.02] tracking-tight text-charcoal sm:text-6xl lg:text-7xl">{title}</h1>
      {text && <p className="mt-8 max-w-2xl text-base leading-relaxed text-warm-600 sm:text-lg">{text}</p>}
    </div>
  </header>
);
