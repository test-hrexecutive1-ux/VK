import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Field, TextInput, TextArea } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import type { Product } from '@/types';

export function EnquiryModal({ product, open, onClose }: { product: Product | null; open: boolean; onClose: () => void }) {
  const { showToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', mobile: '', message: '' });

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
      setForm({ name: '', company: '', mobile: '', message: '' });
      showToast({
        title: 'Enquiry sent',
        message: `Our private client team will be in touch about "${product.name}" shortly.`,
        variant: 'success',
      });
    }, 1400);
  };

  return (
    <Modal open={open} onClose={onClose} title="Enquire About This Piece" subtitle={product.name} maxWidth="max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <p className="text-sm text-charcoal-400 font-light leading-relaxed">
          Each piece is available by private enquiry. Our client services team will respond personally to discuss details, viewings, and bespoke requests.
        </p>

        <Field label="Full Name" required>
          <TextInput
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />
        </Field>

        <Field label="Company Name" hint="Optional">
          <TextInput
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Company name"
          />
        </Field>

        <Field label="Mobile Number" required>
          <TextInput
            required
            type="tel"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            placeholder="+91"
          />
        </Field>

        <Field label="Product Reference">
          <TextInput value={product.reference} disabled className="text-charcoal-400" />
        </Field>

        <Field label="Message">
          <TextArea
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="I would like to arrange a private viewing of this piece…"
          />
        </Field>

        <div className="pt-2">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Sending…' : 'Send Enquiry'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
