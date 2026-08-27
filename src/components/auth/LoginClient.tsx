'use client';
import { useState } from 'react';

function safeNextPath(value: string | null): string | null {
  if (!value) return null;
  if (!value.startsWith('/') || value.startsWith('//')) return null;
  return value;
}

export function LoginClient() {
  const [email, setEmail] = useState('customer@demo.com');
  const [password, setPassword] = useState('Demo123!');
  const [message, setMessage] = useState('');
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(`Signed in as ${data.role}. Secure demo cookie set.`);
      const next = safeNextPath(new URLSearchParams(window.location.search).get('next'));
      if (next) window.location.assign(next);
    } else {
      setMessage(data.error || 'Login failed');
    }
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
