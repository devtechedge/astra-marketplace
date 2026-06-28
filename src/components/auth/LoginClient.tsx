'use client';
import { useState } from 'react';

export function LoginClient() {
  const [email, setEmail] = useState('customer@demo.com');
  const [password, setPassword] = useState('Demo123!');
  const [message, setMessage] = useState('');
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    setMessage(res.ok ? `Signed in as ${data.session.role}. Secure demo cookie set.` : data.error || 'Login failed');
  }
  return <form onSubmit={submit} className="mt-6 space-y-4"><label className="block font-bold">Email<input value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border px-4 py-3" /></label><label className="block font-bold">Password<input value={password} onChange={e => setPassword(e.target.value)} type="password" className="mt-1 w-full rounded-xl border px-4 py-3" /></label><button className="w-full rounded-full bg-brand px-6 py-3 font-bold text-white">Continue</button>{message && <p className="rounded-2xl bg-slate-50 p-3 text-sm font-semibold">{message}</p>}</form>;
}
