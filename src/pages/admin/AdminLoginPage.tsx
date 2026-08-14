import { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Field, TextInput } from '@/components/ui/Field';
import { premiumCtaImage } from '@/data/mockData';

export function AdminLoginPage() {
  const { navigate } = useRouter();
  const { login, showToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login('admin', 'Administrator');
      showToast({ title: 'Welcome', message: 'Signed in to the admin portal.', variant: 'success' });
      navigate({ name: 'admin-dashboard' });
    }, 1200);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img src={premiumCtaImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal-900/80" />
        <div className="absolute inset-0 flex items-end p-16">
          <div>
            <p className="font-serif text-3xl text-ivory-100">VK Jewellers</p>
            <p className="mt-2 text-sm text-ivory-200/60 font-light tracking-wide">Administration Portal</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md animate-fade-in">
          <div className="flex items-baseline gap-2 mb-12">
            <span className="font-serif text-2xl text-charcoal-900">VK</span>
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-charcoal-400">Admin</span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Lock size={18} strokeWidth={1.5} className="text-charcoal-400" />
            <p className="eyebrow">Restricted Access</p>
          </div>
          <h1 className="font-serif text-4xl text-charcoal-800">Admin Login</h1>
          <p className="mt-4 text-charcoal-500 font-light leading-relaxed">
            Authorised personnel only.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <Field label="Email" required>
              <TextInput type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="admin@vkjewellers.com" autoFocus />
            </Field>
            <Field label="Password" required>
              <TextInput type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
            </Field>
            <div className="pt-2">
              <Button type="submit" size="lg" disabled={loading} className="w-full">
                {loading ? 'Signing in…' : 'Sign In'}
                {!loading && <ArrowRight size={16} strokeWidth={1.5} className="ml-2" />}
              </Button>
            </div>
          </form>

          <button onClick={() => navigate({ name: 'home' })} className="mt-8 text-xs uppercase tracking-[0.15em] text-charcoal-400 hover:text-charcoal-700 transition-colors">
            Back to website
          </button>
        </div>
      </div>
    </div>
  );
}
