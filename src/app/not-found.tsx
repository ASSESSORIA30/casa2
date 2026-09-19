import { Button } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-serif text-7xl font-light">404</p>
      <p className="mt-4 text-warm-600">Esta página no existe.</p>
      <div className="mt-8"><Button href="/">Volver al inicio</Button></div>
    </section>
  );
}
