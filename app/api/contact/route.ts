import { NextResponse } from 'next/server';

const required = ['name','phone','email','privacy'];
export async function POST(request: Request) {
  const data = await request.json().catch(() => null);
  if (!data || required.some((field) => !data[field])) return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
  // TODO production: send to CRM/email provider. Do not log personal data in production.
  return NextResponse.json({ ok: true });
}
