import { useState } from 'react';
import { Crown, Lock, ArrowLeft, ChevronRight } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ImageGallery } from '@/components/product/ImageGallery';
import { EnquiryModal } from '@/components/product/EnquiryModal';
import { curatedCollections, products, categories } from '@/data/mockData';
import type { Product } from '@/types';

export function CuratedViewPage({ id }: { id: string }) {
  const { navigate } = useRouter();
  const { role } = useApp();
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null);

  const collection = curatedCollections.find((c) => c.id === id);

  if (!collection) {
    return (
      <div className="min-h-screen pt-32">
        <EmptyState
          title="Collection not found"
          message="This private collection may have been removed or is no longer available."
          action={<Button onClick={() => navigate({ name: 'curated' })}>View Your Collections</Button>}
        />
      </div>
    );
  }

  if (role !== 'premium') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-lg animate-fade-in">
          <Lock size={32} strokeWidth={1} className="text-charcoal-400 mx-auto mb-6" />
          <p className="eyebrow mb-4">Private Collection</p>
          <h1 className="font-serif text-4xl text-charcoal-800">{collection.name}</h1>
          <p className="mt-4 text-charcoal-500 font-light leading-relaxed">
            This private collection is available to authorised clients only. Please login to view the pieces selected for you.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate({ name: 'login' })}>Login</Button>
            <Button variant="outline" size="lg" onClick={() => navigate({ name: 'home' })}>Return to Catalogue</Button>
          </div>
        </div>
      </div>
    );
  }

  const colProducts = collection.productIds
    .map((pid) => products.find((p) => p.id === pid))
    .filter(Boolean) as Product[];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative h-[35vh] min-h-[280px] overflow-hidden">
        <img src={colProducts[0]?.images[0] ?? ''} alt={collection.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal-900/75" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="animate-fade-in">
            <Crown size={28} strokeWidth={1} className="text-champagne-300 mx-auto mb-5" />
            <p className="eyebrow text-champagne-200/80 mb-4">A Private Collection for {collection.clientName}</p>
            <h1 className="font-serif text-ivory-100 text-display-sm text-balance">{collection.name}</h1>
          </div>
        </div>
      </div>

      <div className="container-lux py-16 lg:py-20">
        <button
          onClick={() => navigate({ name: 'curated' })}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-charcoal-400 hover:text-charcoal-700 transition-colors mb-12"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          All Collections
        </button>

        <p className="text-lg text-charcoal-500 font-light max-w-2xl leading-relaxed">
          Welcome to your private collection. Each piece has been personally selected for you by our client services team. Enquire about any piece to arrange a private viewing.
        </p>
      </div>

      {/* Products */}
      <div className="container-lux pb-24 lg:pb-32">
        <div className="space-y-20">
          {colProducts.map((product, i) => {
            const category = categories.find((c) => c.id === product.categoryId);
            return (
              <div key={product.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <ImageGallery images={product.images} alt={product.name} />
                </div>
                <div className={`lg:px-8 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="eyebrow mb-4">{product.collection}</p>
                  <h2 className="font-serif text-3xl lg:text-4xl text-charcoal-800">{product.name}</h2>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-xs text-charcoal-400 font-light tracking-wider">Ref: {product.reference}</span>
                    {category && (
                      <>
                        <span className="block w-px h-3 bg-charcoal-200" />
                        <span className="text-xs text-charcoal-500">{category.name}</span>
                      </>
                    )}
                  </div>
                  <div className="mt-8">
                    <Button onClick={() => setEnquiryProduct(product)}>Enquire About This Piece</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <EnquiryModal product={enquiryProduct} open={!!enquiryProduct} onClose={() => setEnquiryProduct(null)} />
    </div>
  );
}
