import Link from 'next/link';
export default function MobileCTA({ href = '/contacto', label = 'Solicita información' }: { href?: string; label?: string }) {
  return <div className="fixed bottom-3 left-3 right-3 z-40 md:hidden"><Link href={href} className="btn-primary w-full shadow-2xl">{label}</Link></div>;
}
