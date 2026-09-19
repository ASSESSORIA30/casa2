import { NextResponse } from "next/server";

/**
 * Recepción del formulario. PRIMERA VERSIÓN: valida y registra en el log del servidor.
 * TODO producción: conectar con Resend / SendGrid / HubSpot / Airtable, etc.
 */
export async function POST(req: Request) {
  try {
    const b = (await req.json()) as Record<string, string>;
    if (b.web) return NextResponse.json({ ok: true }); // honeypot
    const required = ["nombre", "telefono", "email", "provincia", "parcela", "rgpd"];
    if (required.some((k) => !b[k])) return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(b.email)) return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
    console.log("[lead]", { ...b, receivedAt: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
