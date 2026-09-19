"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** CTA fijo en móvil. En fichas de modelo enlaza al formulario con el modelo preseleccionado. */
export function StickyCta() {
  const path = usePathname();
  if (path.startsWith("/contacto") || path.startsWith("/admin")) return null;
  const m = path.match(/^\/modelos\/([^/]+)/);
  const href = m ? `/contacto?modelo=${m[1]}` : "/contacto";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-charcoal/10 bg-ivory/95 p-3 backdrop-blur lg:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <Link href={href} className="flex min-h-[50px] w-full items-center justify-center bg-charcoal text-[12px] font-medium uppercase tracking-[0.16em] text-ivory">
        {m ? "Quiero esta casa" : "Solicitar información"}
      </Link>
    </div>
  );
}
