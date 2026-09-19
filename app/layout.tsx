import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileCTA from '@/components/MobileCTA';
import { BRAND } from '@/config/brand';

export const metadata: Metadata = {
  title: { default: `${BRAND.name} | Viviendas industrializadas de hormigón`, template: `%s | ${BRAND.name}` },
  description: 'Viviendas industrializadas de hormigón, completamente terminadas, equipadas y preparadas para vivir. Modelos de arquitectura contemporánea con precio claro.',
  keywords: ['casas industrializadas de hormigón','casas de hormigón llave en mano','casas modernas llave en mano','viviendas industrializadas','casas modulares premium','casas completamente equipadas','casa lista para vivir'],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><Header/><main>{children}</main><Footer/><MobileCTA/></body></html>;
}
