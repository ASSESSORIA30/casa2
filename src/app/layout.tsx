import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.brandName} · Casas industrializadas de hormigón, llave en mano y equipadas`, template: `%s · ${site.brandName}` },
  description: site.description,
  openGraph: { type: "website", locale: site.locale, siteName: site.brandName, title: `${site.brandName} · ${site.tagline}`, description: site.description },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#F8F5EF", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = { "@context": "https://schema.org", "@type": "Organization", name: site.brandName, url: site.url, description: site.description };
  return (
    <html lang="es">
      <body>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ivory focus:p-3">Saltar al contenido</a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <StickyCta />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      </body>
    </html>
  );
}
