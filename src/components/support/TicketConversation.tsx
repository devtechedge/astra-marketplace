'use client';
import { useState } from 'react';

export function TicketConversation() {
  const [messages, setMessages] = useState([
    { from: 'Customer', body: 'My package says delivered, but I cannot find it.' },
    { from: 'Agent', body: 'I checked the carrier scan. I can open a delivery investigation or issue store credit if eligible.' }
  ]);
  const [body, setBody] = useState('');
  return <div className="rounded-3xl bg-white p-6 shadow-card"><h2 className="text-2xl font-black">Ticket conversation</h2><div className="mt-5 space-y-3">{messages.map((m, i) => <div key={i} className={`rounded-2xl p-4 ${m.from === 'Agent' ? 'bg-indigo-50' : 'bg-slate-50'}`}><p className="text-xs font-bold uppercase text-slate-500">{m.from}</p><p className="mt-1">{m.body}</p></div>)}</div><div className="mt-5 flex gap-2"><input value={body} onChange={e => setBody(e.target.value)} className="flex-1 rounded-xl border px-4 py-3" placeholder="Write a reply or internal note" /><button onClick={() => { if (body) { setMessages([...messages, { from: 'Customer', body }]); setBody(''); } }} className="rounded-xl bg-brand px-5 font-bold text-white">Send</button></div><div className="mt-5 grid gap-3 md:grid-cols-3"><button className="rounded-full border px-4 py-2 font-bold">Attach image</button><button className="rounded-full border px-4 py-2 font-bold">Use macro</button><button className="rounded-full border px-4 py-2 font-bold">Escalate</button></div></div>;
}
