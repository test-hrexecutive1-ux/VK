import { Lock } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { Button } from '@/components/ui/Button';
import { premiumCtaImage } from '@/data/mockData';

export function AccessDeniedPage() {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={premiumCtaImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal-900/80" />
      </div>

      <div className="relative text-center px-6 py-20 max-w-lg animate-fade-in">
        <Lock size={40} strokeWidth={1} className="text-champagne-300 mx-auto mb-8" />
        <p className="eyebrow text-champagne-200/80 mb-6">Private Collection</p>
        <h1 className="font-serif text-4xl lg:text-5xl text-ivory-100 text-balance">
          This Collection is Reserved.
        </h1>
        <p className="mt-8 text-lg text-ivory-200/70 font-light leading-relaxed">
          This collection is reserved for authorised VK Jewellers clients. Please login to continue, or return to the public catalogue.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate({ name: 'login' })}
            className="bg-ivory-100 text-charcoal-900 hover:bg-ivory-200 border-ivory-100"
          >
            Login
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate({ name: 'categories' })}
            className="text-ivory-100 border-ivory-200/40 hover:bg-ivory-100 hover:text-charcoal-900 hover:border-ivory-100"
          >
            Return to Catalogue
          </Button>
        </div>
      </div>
    </div>
  );
}
