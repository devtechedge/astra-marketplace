'use client';
import { useState } from 'react';

export function TicketConversation() {
  const [messages, setMessages] = useState([
    { from: 'Customer', body: 'My package says delivered, but I cannot find it.' },
    { from: 'Agent', body: 'I checked the carrier scan. I can open a delivery investigation or issue store credit if eligible.' }
  ]);
  const [body, setBody] = useState('');
  return (
    <div className="panel p-6">
      <h2>Ticket conversation</h2>
      <div className="mt-6 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className="border border-line bg-paper p-4">
            <p className="page-kicker">{m.from}</p>
            <p className="mt-2 text-sm">{m.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        <input value={body} onChange={e => setBody(e.target.value)} className="field flex-1" placeholder="Write a reply or internal note" />
        <button
          onClick={() => { if (body) { setMessages([...messages, { from: 'Customer', body }]); setBody(''); } }}
          className="btn btn-solid px-5"
        >
          Send
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        <button className="btn-quiet text-sm">Attach image</button>
        <button className="btn-quiet text-sm">Use macro</button>
        <button className="btn-quiet text-sm">Escalate</button>
      </div>
    </div>
  );
}
