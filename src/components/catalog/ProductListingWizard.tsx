'use client';

import { useState } from 'react';

const steps = ['Category', 'Core details', 'Images', 'Variants', 'Inventory', 'Pricing', 'Shipping', 'Compliance', 'Preview', 'Submit'];
const categoryAttributes: Record<string, string[]> = {
  Electronics: ['Battery', 'Connectivity', 'Warranty', 'Model number'],
  Fashion: ['Size', 'Color', 'Fabric', 'Fit'],
  Books: ['Author', 'ISBN', 'Publisher', 'Language'],
  Beauty: ['Ingredients', 'Skin type', 'Warnings', 'Cruelty-free'],
  Grocery: ['Nutrition', 'Expiration', 'Allergens', 'Pack size']
};

export function ProductListingWizard() {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState('Electronics');
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return <div className="rounded-3xl bg-white p-10 text-center shadow-card"><h2 className="text-3xl font-black text-emerald-700">Listing submitted for moderation</h2><p className="mt-2 text-slate-600">A product draft, image records, variants, inventory, and audit event were simulated.</p></div>;
  return <div className="rounded-3xl bg-white p-6 shadow-card"><div className="mb-6 flex gap-2 overflow-x-auto">{steps.map((s, i) => <button key={s} onClick={() => setStep(i)} className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-bold ${i === step ? 'bg-brand text-white' : i < step ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100'}`}>{i + 1}. {s}</button>)}</div>
    {step === 0 && <section><h2 className="text-2xl font-black">Select category</h2><select value={category} onChange={e => setCategory(e.target.value)} className="mt-4 w-full rounded-xl border px-4 py-3">{Object.keys(categoryAttributes).map(c => <option key={c}>{c}</option>)}</select><p className="mt-3 text-sm text-slate-600">Dynamic attributes: {categoryAttributes[category].join(', ')}</p></section>}
    {step === 1 && <section className="grid gap-4"><h2 className="text-2xl font-black">Core details</h2><input className="rounded-xl border px-4 py-3" placeholder="Product title" /><input className="rounded-xl border px-4 py-3" placeholder="Brand" /><textarea className="min-h-32 rounded-xl border px-4 py-3" placeholder="Long description" /></section>}
    {step === 2 && <section><h2 className="text-2xl font-black">Image manager</h2><div className="mt-4 rounded-3xl border-2 border-dashed border-slate-300 p-10 text-center"><p className="font-bold">Drag-and-drop images here</p><p className="text-sm text-slate-600">Local preview, ordering, alt text and S3/R2 adapter hooks.</p></div></section>}
    {step === 3 && <section><h2 className="text-2xl font-black">Variants</h2><div className="mt-4 grid gap-3 md:grid-cols-3"><input className="rounded-xl border px-4 py-3" placeholder="Option name e.g. Color" /><input className="rounded-xl border px-4 py-3" placeholder="Values e.g. Black, Blue" /><input className="rounded-xl border px-4 py-3" placeholder="SKU prefix" /></div></section>}
    {step === 4 && <section><h2 className="text-2xl font-black">Inventory</h2><div className="mt-4 grid gap-3 md:grid-cols-3"><input className="rounded-xl border px-4 py-3" placeholder="SKU" /><input className="rounded-xl border px-4 py-3" placeholder="Quantity" /><input className="rounded-xl border px-4 py-3" placeholder="Low stock threshold" /></div></section>}
    {step === 5 && <section><h2 className="text-2xl font-black">Pricing</h2><div className="mt-4 grid gap-3 md:grid-cols-3"><input className="rounded-xl border px-4 py-3" placeholder="List price" /><input className="rounded-xl border px-4 py-3" placeholder="Sale price" /><input className="rounded-xl border px-4 py-3" placeholder="Coupon eligibility" /></div></section>}
    {step === 6 && <section><h2 className="text-2xl font-black">Shipping</h2><div className="mt-4 grid gap-3 md:grid-cols-4"><input className="rounded-xl border px-4 py-3" placeholder="Weight" /><input className="rounded-xl border px-4 py-3" placeholder="Length" /><input className="rounded-xl border px-4 py-3" placeholder="Width" /><input className="rounded-xl border px-4 py-3" placeholder="Height" /></div></section>}
    {step === 7 && <section><h2 className="text-2xl font-black">Compliance</h2><div className="mt-4 grid gap-3 md:grid-cols-2">{categoryAttributes[category].map(a => <input key={a} className="rounded-xl border px-4 py-3" placeholder={a} />)}</div></section>}
    {step === 8 && <section><h2 className="text-2xl font-black">Preview listing</h2><div className="mt-4 rounded-2xl bg-slate-50 p-5"><p className="font-bold">Preview card, PDP content, variants, inventory, pricing, shipping and compliance data.</p><p className="mt-2 text-sm text-slate-600">Status after submit: Pending moderation.</p></div></section>}
    {step === 9 && <section><h2 className="text-2xl font-black">Submit</h2><p className="mt-2 text-slate-600">Submit listing to marketplace moderation. Seller and admin audit logs will be recorded.</p></section>}
    <div className="mt-8 flex justify-end gap-3"><button onClick={() => setStep(Math.max(0, step - 1))} className="rounded-full border px-5 py-2 font-bold">Back</button><button onClick={() => step === steps.length - 1 ? setSubmitted(true) : setStep(step + 1)} className="rounded-full bg-coral px-5 py-2 font-bold text-white">{step === steps.length - 1 ? 'Submit listing' : 'Continue'}</button></div>
  </div>;
}
