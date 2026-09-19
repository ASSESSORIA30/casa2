'use client';

import { FormEvent, useState } from 'react';
import type { PublicHouse } from '@/data/types';

export default function ContactForm({ houses = [], defaultModel = '' }: { houses?: PublicHouse[]; defaultModel?: string }) {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      setStatus('sent');
    } catch { setStatus('error'); }
  }

  return (
    <form onSubmit={submit} className="grid gap-x-8 gap-y-5 md:grid-cols-2">
      <input className="field" name="name" placeholder="Nombre *" required/>
      <input className="field" name="phone" placeholder="Teléfono *" required/>
      <input className="field" type="email" name="email" placeholder="Email *" required/>
      <input className="field" name="province" placeholder="Provincia"/>
      <select className="field" name="plot" defaultValue=""><option value="" disabled>¿Tienes parcela?</option><option>Sí</option><option>No</option><option>Estoy buscándola</option></select>
      <select className="field" name="model" defaultValue={defaultModel}><option value="">Modelo que te interesa</option>{houses.map((house) => <option key={house.slug} value={house.name}>{house.name} · {house.surface} m²</option>)}</select>
      <textarea className="field min-h-28 md:col-span-2" name="message" placeholder="Cuéntanos dónde quieres vivir"/>
      <label className="flex items-start gap-3 text-xs leading-5 opacity-70 md:col-span-2"><input type="checkbox" name="privacy" required className="mt-1"/> He leído y acepto la política de privacidad y el tratamiento de mis datos para atender esta solicitud.</label>
      <div className="md:col-span-2 flex flex-wrap items-center gap-4 pt-2">
        <button className="btn-primary" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Solicitar información'}</button>
        {status === 'sent' && <p className="text-sm">Solicitud recibida. Nos pondremos en contacto contigo.</p>}
        {status === 'error' && <p className="text-sm">No se ha podido enviar. Inténtalo de nuevo.</p>}
      </div>
    </form>
  );
}
