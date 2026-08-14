import { Crown, Lock, ArrowRight, Check } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { premiumCtaImage, products } from '@/data/mockData';

export function PremiumAccessPage() {
  const { navigate } = useRouter();
  const { role, userName, login, logout, showToast } = useApp();

  const premiumProducts = products.filter((p) => p.visibility === 'premium').slice(0, 3);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <img src={premiumCtaImage} alt="Private Collection" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal-900/70" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="animate-fade-in">
            <Crown size={32} strokeWidth={1} className="text-champagne-300 mx-auto mb-6" />
            <p className="eyebrow text-champagne-200/80 mb-4">Private Client Services</p>
            <h1 className="font-serif text-ivory-100 text-display-sm text-balance">
              The Private Collection
            </h1>
          </div>
        </div>
      </div>

      <div className="container-lux-narrow py-20 lg:py-32">
        {role === 'guest' && (
          <div className="text-center max-w-xl mx-auto animate-fade-in">
            <Lock size={28} strokeWidth={1} className="text-charcoal-400 mx-auto mb-6" />
            <h2 className="font-serif text-3xl text-charcoal-800">Access Required</h2>
            <p className="mt-4 text-charcoal-500 font-light leading-relaxed">
              The private collection is available only to authorised VK Jewellers clients. Please login or request membership to view these exceptional pieces.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate({ name: 'login' })}>Login to Continue</Button>
              <Button variant="outline" size="lg" onClick={() => navigate({ name: 'register' })}>Request Membership</Button>
            </div>
          </div>
        )}

        {role === 'registered' && (
          <div className="text-center max-w-xl mx-auto animate-fade-in">
            <Crown size={28} strokeWidth={1} className="text-champagne-600 mx-auto mb-6" />
            <h2 className="font-serif text-3xl text-charcoal-800">Upgrade to Premium</h2>
            <p className="mt-4 text-charcoal-500 font-light leading-relaxed">
              Welcome, {userName}. You're viewing the catalogue as a registered member. The private collection is reserved for premium clients. Request access below to unlock the full experience.
            </p>
            <div className="mt-10">
              <Button
                size="lg"
                onClick={() => {
                  login('premium', userName);
                  showToast({ title: 'Premium access granted', message: 'You now have access to the private collection.', variant: 'success' });
                }}
                className="bg-champagne-200 text-charcoal-900 hover:bg-champagne-100 border-champagne-200"
              >
                Request Premium Access
                <ArrowRight size={16} strokeWidth={1.5} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {role === 'premium' && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-12">
              <Crown size={24} strokeWidth={1.5} className="text-champagne-600" />
              <div>
                <p className="text-sm font-medium text-charcoal-800">Welcome, {userName}</p>
                <p className="text-xs text-charcoal-400 font-light">Premium Client — Full Access</p>
              </div>
            </div>

            <h2 className="font-serif text-3xl lg:text-4xl text-charcoal-800 mb-4">Your Private Collection</h2>
            <p className="text-charcoal-500 font-light max-w-2xl leading-relaxed">
              A curated selection of our most exceptional pieces, available exclusively to you. Enquire about any piece to arrange a private viewing.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {premiumProducts.map((product, i) => (
                <button
                  key={product.id}
                  onClick={() => navigate({ name: 'product', slug: product.slug })}
                  className="group text-left animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-ivory-200">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-lux group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-champagne-600">{product.collection}</p>
                    <h3 className="font-serif text-xl text-charcoal-800 mt-1 group-hover:text-champagne-700 transition-colors">{product.name}</h3>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-16 p-8 bg-ivory-200 border border-ivory-300">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-serif text-2xl text-charcoal-800">Curated Collections</h3>
                  <p className="mt-2 text-sm text-charcoal-500 font-light">
                    Explore private collections curated specifically for you by our client services team.
                  </p>
                </div>
                <Button variant="outline" onClick={() => navigate({ name: 'curated' })}>
                  View Collections
                </Button>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-charcoal-400 font-light">
              <Check size={16} strokeWidth={1.5} className="text-accent-success" />
              Full catalogue access · Private enquiries · Curated collections
            </div>

            <div className="mt-8">
              <button onClick={logout} className="text-xs uppercase tracking-[0.15em] text-charcoal-400 hover:text-charcoal-700 transition-colors">
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
