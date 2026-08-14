import { useState, useRef } from 'react';
import { ArrowLeft, RotateCw } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';

export function OtpPage() {
  const { navigate } = useRouter();
  const { login, showToast } = useApp();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newDigits.every((d) => d !== '')) {
      handleVerify(newDigits.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (code: string) => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      // Mock: any code works, but "000000" shows error
      if (code === '000000') {
        setError('Invalid verification code. Please try again.');
        setDigits(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        showToast({ title: 'Welcome back', message: 'You are now signed in to VK Jewellers.', variant: 'success' });
        login('registered', 'Priya Sharma');
        navigate({ name: 'premium-access' });
      }
    }, 1500);
  };

  const handleResend = () => {
    setResendDisabled(true);
    showToast({ title: 'Code resent', message: 'A new verification code has been sent.', variant: 'info' });
    setTimeout(() => setResendDisabled(false), 30000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md animate-fade-in">
        <button onClick={() => navigate({ name: 'login' })} className="flex items-baseline gap-2 mb-12">
          <span className="font-serif text-2xl text-charcoal-900">VK</span>
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-charcoal-400">Jewellers</span>
        </button>

        <p className="eyebrow mb-4">Verification</p>
        <h1 className="font-serif text-4xl text-charcoal-800">Verify Your Number</h1>
        <p className="mt-4 text-charcoal-500 font-light leading-relaxed">
          We've sent a 6-digit code to your WhatsApp number. Enter it below to continue.
        </p>

        <div className="mt-10">
          <div className="flex gap-3 justify-between">
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                disabled={loading}
                className={`w-12 h-14 lg:w-14 lg:h-16 text-center text-2xl font-serif border-b-2 bg-transparent transition-colors duration-300 focus:outline-none ${
                  error
                    ? 'border-accent-error text-accent-error'
                    : digit
                    ? 'border-charcoal-800 text-charcoal-800'
                    : 'border-charcoal-200 text-charcoal-800 focus:border-charcoal-800'
                }`}
                autoFocus={i === 0}
              />
            ))}
          </div>

          {error && <p className="mt-4 text-sm text-accent-error font-light">{error}</p>}

          {loading && (
            <div className="mt-6 flex items-center gap-3 text-charcoal-500">
              <div className="w-5 h-5 border-2 border-charcoal-200 border-t-charcoal-700 rounded-full animate-spin" />
              <span className="text-sm font-light">Verifying…</span>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-ivory-300">
          <button
            onClick={handleResend}
            disabled={resendDisabled}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-charcoal-500 hover:text-charcoal-800 transition-colors disabled:opacity-40"
          >
            <RotateCw size={14} strokeWidth={1.5} />
            {resendDisabled ? 'Code sent' : 'Resend OTP'}
          </button>
          <button
            onClick={() => navigate({ name: 'login' })}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-charcoal-500 hover:text-charcoal-800 transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Change number
          </button>
        </div>

        <p className="mt-8 text-xs text-charcoal-300 font-light text-center">
          For this prototype, any 6-digit code will work (except 000000).
        </p>
      </div>
    </div>
  );
}
