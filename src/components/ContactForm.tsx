"use client";
import { useState, type FormEvent } from "react";
import { provinces } from "@/data/content";

export function ContactForm({ models, defaultModel = "" }: { models: { slug: string; title: string }[]; defaultModel?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setState(res.ok ? "ok" : "error");
    } catch { setState("error"); }
  }
  if (state === "ok")
    return (
      <div className="border border-charcoal/15 bg-stone-50 p-10 text-center" role="status">
        <p className="font-serif text-3xl font-light">Gracias. Hemos recibido tu solicitud.</p>
        <p className="mt-4 text-warm-600">Nos pondremos en contacto contigo lo antes posible para contarte los siguientes pasos.</p>
      </div>
    );
  const field = "w-full min-h-[52px] border-0 border-b border-charcoal/30 bg-transparent px-0 py-3 text-base text-charcoal outline-none transition-colors placeholder:text-warm-400 focus:border-bronze";
  const label = "mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-warm-600";
  return (
    <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2" id="formulario">
      <div><label className={label} htmlFor="nombre">Nombre</label><input id="nombre" name="nombre" required autoComplete="name" className={field} /></div>
      <div><label className={label} htmlFor="telefono">Teléfono</label><input id="telefono" name="telefono" type="tel" required autoComplete="tel" inputMode="tel" className={field} /></div>
      <div><label className={label} htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" className={field} /></div>
      <div>
        <label className={label} htmlFor="provincia">Provincia</label>
        <select id="provincia" name="provincia" required defaultValue="" className={field}><option value="" disabled>Selecciona</option>{provinces.map((p) => <option key={p}>{p}</option>)}</select>
      </div>
      <div>
        <label className={label} htmlFor="parcela">¿Tienes parcela?</label>
        <select id="parcela" name="parcela" required defaultValue="" className={field}>
          <option value="" disabled>Selecciona</option><option>Sí, ya tengo parcela</option><option>Estoy buscando parcela</option><option>Aún no</option>
        </select>
      </div>
      <div>
        <label className={label} htmlFor="modelo">Modelo que te interesa</label>
        <select id="modelo" name="modelo" defaultValue={defaultModel} className={field}>
          <option value="">Aún no lo sé</option>{models.map((m) => <option key={m.slug} value={m.slug}>{m.title}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2"><label className={label} htmlFor="mensaje">Mensaje</label><textarea id="mensaje" name="mensaje" rows={4} className={`${field} resize-none`} /></div>
      <input type="text" name="web" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="flex items-start gap-3 text-sm leading-relaxed text-warm-600 sm:col-span-2">
        <input type="checkbox" name="rgpd" required className="mt-1 h-5 w-5 shrink-0 accent-charcoal" />
        <span>He leído y acepto la <a href="/legal/privacidad" className="underline">política de privacidad</a> y el tratamiento de mis datos para atender mi solicitud.</span>
      </label>
      <div className="sm:col-span-2">
        <button disabled={state === "sending"} className="min-h-[56px] w-full bg-charcoal px-10 text-[12px] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-bronze-dark disabled:opacity-50 sm:w-auto">
          {state === "sending" ? "Enviando…" : "Enviar solicitud"}
        </button>
        {state === "error" && <p className="mt-4 text-sm text-red-800" role="alert">No hemos podido enviar el formulario. Inténtalo de nuevo o escríbenos por email.</p>}
      </div>
    </form>
  );
}
