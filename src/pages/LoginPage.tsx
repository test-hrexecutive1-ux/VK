import { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Field, TextInput } from '@/components/ui/Field';
import { heroImage } from '@/data/mockData';

export function LoginPage() {
  const { navigate } = useRouter();
  const { showToast } = useApp();
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!mobile.trim() || mobile.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate({ name: 'otp' });
    }, 1200);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Image side */}
      <div className="relative hidden lg:block">
        <img src={heroImage} alt="VK Jewellers" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal-900/40" />
        <div className="absolute bottom-0 left-0 right-0 p-16">
          <p className="font-serif text-3xl text-ivory-100 leading-tight">
            "Jewellery is the most intimate<br />of all ornaments."
          </p>
          <p className="mt-4 text-sm text-ivory-200/60 font-light tracking-wide">— VK Jewellers</p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center px-6 py-20 lg:p-20">
        <div className="w-full max-w-md animate-fade-in">
          <button onClick={() => navigate({ name: 'home' })} className="flex items-baseline gap-2 mb-12">
            <span className="font-serif text-2xl text-charcoal-900">VK</span>
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-charcoal-400">Jewellers</span>
          </button>

          <p className="eyebrow mb-4">Private Access</p>
          <h1 className="font-serif text-4xl text-charcoal-800">Welcome to VK Jewellers</h1>
          <p className="mt-4 text-charcoal-500 font-light leading-relaxed">
            Access your private jewellery catalogue.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <Field label="WhatsApp Number" required error={error} hint="We'll send a verification code to this number.">
              <TextInput
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91"
                autoFocus
              />
            </Field>

            <div className="pt-2">
              <Button type="submit" size="lg" disabled={loading} className="w-full">
                {loading ? 'Sending code…' : 'Continue'}
                {!loading && <ArrowRight size={16} strokeWidth={1.5} className="ml-2" />}
              </Button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-ivory-300">
            <p className="text-sm text-charcoal-400 font-light">
              New to VK Jewellers?{' '}
              <button onClick={() => navigate({ name: 'register' })} className="text-charcoal-800 underline underline-offset-4 hover:text-champagne-700 transition-colors">
                Request membership
              </button>
            </p>
          </div>

          <button
            onClick={() => navigate({ name: 'home' })}
            className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-charcoal-400 hover:text-charcoal-700 transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back to catalogue
          </button>
        </div>
      </div>
    </div>
  );
}
