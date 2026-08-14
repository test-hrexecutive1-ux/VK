import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Field, TextInput } from '@/components/ui/Field';
import { heroImage } from '@/data/mockData';

export function RegisterPage() {
  const { navigate } = useRouter();
  const { showToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', mobile: '', email: '', company: '', consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name';
    if (!form.mobile.trim() || form.mobile.replace(/\D/g, '').length < 10) newErrors.mobile = 'Please enter a valid mobile number';
    if (!form.consent) newErrors.consent = 'Please accept the privacy policy to continue';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast({ title: 'Registration received', message: 'Your membership request has been submitted. Our team will be in touch.', variant: 'success' });
      navigate({ name: 'otp' });
    }, 1400);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img src={heroImage} alt="VK Jewellers" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal-900/40" />
      </div>

      <div className="flex items-center justify-center px-6 py-20 lg:p-20">
        <div className="w-full max-w-md animate-fade-in">
          <button onClick={() => navigate({ name: 'home' })} className="flex items-baseline gap-2 mb-12">
            <span className="font-serif text-2xl text-charcoal-900">VK</span>
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-charcoal-400">Jewellers</span>
          </button>

          <p className="eyebrow mb-4">Private Membership</p>
          <h1 className="font-serif text-4xl text-charcoal-800">Request Membership</h1>
          <p className="mt-4 text-charcoal-500 font-light leading-relaxed">
            VK Jewellers is a private catalogue. Please share your details and our client services team will be in touch to arrange access.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <Field label="Full Name" required error={errors.name}>
              <TextInput
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
                autoFocus
              />
            </Field>

            <Field label="Mobile Number" required error={errors.mobile}>
              <TextInput
                type="tel"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                placeholder="+91"
              />
            </Field>

            <Field label="Email" hint="Optional">
              <TextInput
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
            </Field>

            <Field label="Company Name" hint="Optional">
              <TextInput
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Company name"
              />
            </Field>

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-charcoal-800"
                />
                <span className="text-sm text-charcoal-500 font-light leading-relaxed">
                  I consent to VK Jewellers processing my information in accordance with the{' '}
                  <button type="button" onClick={() => navigate({ name: 'privacy' })} className="text-charcoal-800 underline underline-offset-4">
                    Privacy Policy
                  </button>
                  .
                </span>
              </label>
              {errors.consent && <p className="mt-2 text-xs text-accent-error font-light">{errors.consent}</p>}
            </div>

            <div className="pt-2">
              <Button type="submit" size="lg" disabled={loading} className="w-full">
                {loading ? 'Submitting…' : 'Submit Request'}
                {!loading && <ArrowRight size={16} strokeWidth={1.5} className="ml-2" />}
              </Button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-ivory-300">
            <p className="text-sm text-charcoal-400 font-light">
              Already a member?{' '}
              <button onClick={() => navigate({ name: 'login' })} className="text-charcoal-800 underline underline-offset-4 hover:text-champagne-700 transition-colors">
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
