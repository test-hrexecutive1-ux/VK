import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Field, TextInput, TextArea } from '@/components/ui/Field';
import { useApp } from '@/context/AppContext';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function ContactPage() {
  const { showToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', mobile: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: '', email: '', mobile: '', message: '' });
      showToast({ title: 'Message sent', message: 'Our client services team will respond within 24 hours.', variant: 'success' });
    }, 1400);
  };

  const locations = [
    { city: 'Mumbai', address: 'Hornby Vellard, Inner Estate, Mumbai 400032', phone: '+91 22 6789 1234' },
    { city: 'Delhi', address: 'Aurangzeb Road, New Delhi 110011', phone: '+91 11 2345 6789' },
    { city: 'Bengaluru', address: 'Lavelle Road, Bengaluru 560001', phone: '+91 80 3456 7890' },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Get in Touch"
        title="Private Client Services"
        subtitle="Arrange a private viewing, enquire about a piece, or speak with our client services team. By appointment only."
      />

      <div className="container-lux pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <div>
            <h2 className="font-serif text-3xl text-charcoal-800 mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Field label="Full Name" required>
                <TextInput required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
              </Field>
              <Field label="Email" required>
                <TextInput required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
              </Field>
              <Field label="Mobile Number">
                <TextInput type="tel" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="+91" />
              </Field>
              <Field label="Message" required>
                <TextArea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How may we assist you?" />
              </Field>
              <div className="pt-2">
                <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                  {loading ? 'Sending…' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>

          {/* Showrooms */}
          <div>
            <h2 className="font-serif text-3xl text-charcoal-800 mb-8">Our Showrooms</h2>
            <div className="space-y-8">
              {locations.map((loc) => (
                <div key={loc.city} className="pb-8 border-b border-ivory-300 last:border-0">
                  <h3 className="font-serif text-xl text-charcoal-800 mb-3">{loc.city}</h3>
                  <div className="space-y-2 text-sm text-charcoal-500 font-light">
                    <p className="flex items-start gap-2"><MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-charcoal-400" /> {loc.address}</p>
                    <p className="flex items-center gap-2"><Phone size={16} strokeWidth={1.5} className="shrink-0 text-charcoal-400" /> {loc.phone}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-ivory-200 border border-ivory-300">
              <p className="flex items-center gap-2 text-sm text-charcoal-600 font-light">
                <Clock size={16} strokeWidth={1.5} className="text-charcoal-400" />
                By appointment only — Monday to Saturday, 11am to 7pm
              </p>
              <p className="flex items-center gap-2 mt-3 text-sm text-charcoal-600 font-light">
                <Mail size={16} strokeWidth={1.5} className="text-charcoal-400" />
                private.clients@vkjewellers.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
