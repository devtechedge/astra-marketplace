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
  if (submitted) {
    return (
      <div className="panel p-10 text-center">
        <p className="page-kicker">Submitted</p>
        <h2 className="mt-2">Listing sent for moderation</h2>
        <p className="page-lead mx-auto">A product draft, image records, variants, inventory, and audit event were simulated.</p>
      </div>
    );
  }
  return (
    <div className="panel p-6">
      <div className="mb-6 flex gap-2 overflow-x-auto border-b border-line pb-3">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={`whitespace-nowrap px-2 py-1 text-[12px] ${i === step ? 'text-ink' : 'text-muted'}`}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>
      {step === 0 && (
        <section>
          <h2>Select category</h2>
          <select value={category} onChange={e => setCategory(e.target.value)} className="field mt-4">
            {Object.keys(categoryAttributes).map(c => <option key={c}>{c}</option>)}
          </select>
          <p className="mt-3 text-sm text-muted">Dynamic attributes: {categoryAttributes[category].join(', ')}</p>
        </section>
      )}
      {step === 1 && (
        <section className="grid gap-4">
          <h2>Core details</h2>
          <input className="field" placeholder="Product title" />
          <input className="field" placeholder="Brand" />
          <textarea className="field min-h-32" placeholder="Long description" />
        </section>
      )}
      {step === 2 && (
        <section>
          <h2>Image manager</h2>
          <div className="mt-4 border border-dashed border-line p-10 text-center">
            <p className="font-medium">Drag-and-drop images here</p>
            <p className="text-sm text-muted">Local preview, ordering, alt text and S3/R2 adapter hooks.</p>
          </div>
        </section>
      )}
      {step === 3 && (
        <section>
          <h2>Variants</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <input className="field" placeholder="Option name e.g. Color" />
            <input className="field" placeholder="Values e.g. Black, Blue" />
            <input className="field" placeholder="SKU prefix" />
          </div>
        </section>
      )}
      {step === 4 && (
        <section>
          <h2>Inventory</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <input className="field" placeholder="SKU" />
            <input className="field" placeholder="Quantity" />
            <input className="field" placeholder="Low stock threshold" />
          </div>
        </section>
      )}
      {step === 5 && (
        <section>
          <h2>Pricing</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <input className="field" placeholder="List price" />
            <input className="field" placeholder="Sale price" />
            <input className="field" placeholder="Coupon eligibility" />
          </div>
        </section>
      )}
      {step === 6 && (
        <section>
          <h2>Shipping</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <input className="field" placeholder="Weight" />
            <input className="field" placeholder="Length" />
            <input className="field" placeholder="Width" />
            <input className="field" placeholder="Height" />
          </div>
        </section>
      )}
      {step === 7 && (
        <section>
          <h2>Compliance</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {categoryAttributes[category].map(a => <input key={a} className="field" placeholder={a} />)}
          </div>
        </section>
      )}
      {step === 8 && (
        <section>
          <h2>Preview listing</h2>
          <div className="mt-4 border border-line bg-paper p-5">
            <p className="font-medium">Preview card, PDP content, variants, inventory, pricing, shipping and compliance data.</p>
            <p className="mt-2 text-sm text-muted">Status after submit: Pending moderation.</p>
          </div>
        </section>
      )}
      {step === 9 && (
        <section>
          <h2>Submit</h2>
          <p className="mt-2 text-sm text-muted">Submit listing to marketplace moderation. Seller and admin audit logs will be recorded.</p>
        </section>
      )}
      <div className="mt-10 flex justify-end gap-3">
        <button onClick={() => setStep(Math.max(0, step - 1))} className="btn btn-ghost">Back</button>
        <button onClick={() => step === steps.length - 1 ? setSubmitted(true) : setStep(step + 1)} className="btn btn-solid">
          {step === steps.length - 1 ? 'Submit listing' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
