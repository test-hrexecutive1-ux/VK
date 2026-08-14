import { PageHeader } from '@/components/layout/PageHeader';
import { useRouter } from '@/context/RouterContext';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { curatedCollections, products } from '@/data/mockData';
import { Crown, Lock, ArrowRight } from 'lucide-react';

export function CuratedLandingPage() {
  const { navigate } = useRouter();
  const { role } = useApp();

  if (role !== 'premium') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-lg animate-fade-in">
          <Lock size={32} strokeWidth={1} className="text-charcoal-400 mx-auto mb-6" />
          <p className="eyebrow mb-4">Private Access</p>
          <h1 className="font-serif text-4xl text-charcoal-800">Curated Collections</h1>
          <p className="mt-4 text-charcoal-500 font-light leading-relaxed">
            Curated collections are personalised selections created by our client services team for individual clients. Please login to view collections shared with you.
          </p>
          <div className="mt-10">
            <Button size="lg" onClick={() => navigate({ name: 'login' })}>Login to Continue</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <PageHeader
        eyebrow="Curated for You"
        title="Your Private Collections"
        subtitle="Personalised selections composed by our client services team, reserved for your private viewing."
      />
      <div className="container-lux pb-24 lg:pb-32">
        {curatedCollections.length > 0 ? (
          <div className="space-y-8">
            {curatedCollections.map((col, i) => {
              const colProducts = col.productIds
                .map((id) => products.find((p) => p.id === id))
                .filter(Boolean)
                .slice(0, 4);

              return (
                <button
                  key={col.id}
                  onClick={() => navigate({ name: 'curated-view', id: col.id })}
                  className="group block w-full text-left border border-ivory-300 hover:border-charcoal-200 transition-colors duration-500 animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Crown size={16} strokeWidth={1.5} className="text-champagne-600" />
                          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-champagne-600 font-medium">Private Collection</span>
                        </div>
                        <h2 className="font-serif text-3xl text-charcoal-800 group-hover:text-champagne-700 transition-colors">{col.name}</h2>
                        <p className="mt-3 text-sm text-charcoal-400 font-light">{col.productIds.length} pieces · Created {new Date(col.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                      <div className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-charcoal-600 group-hover:text-charcoal-900 transition-colors">
                        View Collection
                        <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <div className="lg:col-span-7 grid grid-cols-4 gap-0 border-l border-ivory-300">
                      {colProducts.map((product) => (
                        <div key={product!.id} className="aspect-square overflow-hidden bg-ivory-200">
                          <img src={product!.images[0]} alt={product!.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <EmptyState title="No collections yet" message="Your curated collections will appear here once created by our client services team." />
        )}
      </div>
    </div>
  );
}
