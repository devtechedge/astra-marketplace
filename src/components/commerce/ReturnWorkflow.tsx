'use client';

import { useState } from 'react';

export function ReturnWorkflow() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <div className="panel p-8">
        <p className="page-kicker">RMA created</p>
        <h2 className="mt-2">Return request submitted</h2>
        <p className="page-lead">RMA RMA-DEMO-{Date.now().toString().slice(-4)} generated. Refund approval queue and notifications were simulated.</p>
      </div>
    );
  }
  return (
    <div className="panel p-6">
      <div className="mb-6 flex gap-2">
        {[1, 2, 3, 4].map(n => (
          <span key={n} className={`grid size-8 place-items-center text-xs font-medium ${n <= step ? 'bg-ink text-surface' : 'border border-line text-muted'}`}>{n}</span>
        ))}
      </div>
      {step === 1 && (
        <section>
          <h2>Select item</h2>
          <select className="field mt-4">
            <option>Nova X7 Wireless Noise-Canceling Headphones</option>
            <option>Designing Deep Work Systems</option>
          </select>
        </section>
      )}
      {step === 2 && (
        <section>
          <h2>Return reason</h2>
          <select className="field mt-4">
            <option>Item arrived late</option>
            <option>Wrong item</option>
            <option>Damaged item</option>
            <option>No longer needed</option>
          </select>
        </section>
      )}
      {step === 3 && (
        <section>
          <h2>Method and refund</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <button className="border border-line p-4 text-left text-sm font-medium">Drop-off location</button>
            <button className="border border-line p-4 text-left text-sm font-medium">Carrier pickup</button>
            <button className="border border-line p-4 text-left text-sm font-medium">Original payment method</button>
            <button className="border border-line p-4 text-left text-sm font-medium">Instant store credit</button>
          </div>
        </section>
      )}
      {step === 4 && (
        <section>
          <h2>Review request</h2>
          <p className="mt-2 text-sm text-muted">RMA, label placeholder, refund routing and admin audit event will be generated.</p>
        </section>
      )}
      <div className="mt-6 flex justify-end gap-3">
        <button onClick={() => setStep(Math.max(1, step - 1))} className="btn btn-ghost">Back</button>
        <button onClick={() => step === 4 ? setDone(true) : setStep(step + 1)} className="btn btn-solid">{step === 4 ? 'Submit return' : 'Continue'}</button>
      </div>
    </div>
  );
}
