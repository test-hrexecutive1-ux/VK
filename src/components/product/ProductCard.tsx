import { Lock, Crown } from 'lucide-react';
import type { Product } from '@/types';
import { useRouter } from '@/context/RouterContext';
import { useApp } from '@/context/AppContext';
import { categories } from '@/data/mockData';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { navigate } = useRouter();
  const { role } = useApp();

  const isLocked =
    (product.visibility === 'login_required' && role === 'guest') ||
    (product.visibility === 'premium' && role !== 'premium');

  const category = categories.find((c) => c.id === product.categoryId);

  return (
    <button
      onClick={() => navigate({ name: 'product', slug: product.slug })}
      className="group text-left block w-full animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[1.4s] ease-lux group-hover:scale-[1.04]"
          loading="lazy"
        />
        {isLocked && (
          <div className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-[3px] flex flex-col items-center justify-center text-ivory-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-lux">
            {product.visibility === 'premium' ? (
              <Crown size={24} strokeWidth={1} className="text-champagne-200 mb-3" />
            ) : (
              <Lock size={22} strokeWidth={1} className="text-ivory-200/90 mb-3" />
            )}
            <p className="font-serif text-lg tracking-wide">
              {product.visibility === 'premium' ? 'Private Collection' : 'Members Only'}
            </p>
            <p className="text-[0.6rem] uppercase tracking-[0.25em] mt-2 text-ivory-200/70">
              {product.visibility === 'premium' && role === 'registered' ? 'Request Access' : 'Login to View'}
            </p>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-[0.6rem] uppercase tracking-[0.2em] text-charcoal-400 font-light">{category?.name}</p>
        <h3 className="font-serif text-lg text-charcoal-800 mt-1 group-hover:text-charcoal-500 transition-colors duration-500">
          {product.name}
        </h3>
      </div>
    </button>
  );
}
