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
  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <label className="label">Email
        <input value={email} onChange={e => setEmail(e.target.value)} className="field" autoComplete="email" />
      </label>
      <label className="label">Password
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="field" autoComplete="current-password" />
      </label>
      <button className="btn btn-solid w-full">Continue</button>
      {message && <p className="border border-line bg-paper p-3 text-sm">{message}</p>}
    </form>
  );
}
