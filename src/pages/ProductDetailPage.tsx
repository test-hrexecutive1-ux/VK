import { useState } from 'react';
import { ChevronRight, Lock, Crown } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { ImageGallery } from '@/components/product/ImageGallery';
import { EnquiryModal } from '@/components/product/EnquiryModal';
import { ProductCard } from '@/components/product/ProductCard';
import { products, categories } from '@/data/mockData';

export function ProductDetailPage({ slug }: { slug: string }) {
  const { navigate } = useRouter();
  const { role, showToast } = useApp();
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-charcoal-800">Piece not found</h1>
          <p className="mt-4 text-charcoal-400 font-light">This piece may have been moved or is no longer available.</p>
          <div className="mt-8">
            <Button onClick={() => navigate({ name: 'categories' })}>View Collections</Button>
          </div>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const isLocked =
    (product.visibility === 'login_required' && role === 'guest') ||
    (product.visibility === 'premium' && role !== 'premium');

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleLockedClick = () => {
    if (product.visibility === 'premium' && role === 'registered') {
      showToast({
        title: 'Premium access required',
        message: 'This piece is reserved for private clients. Request access to view the full collection.',
        variant: 'info',
      });
      navigate({ name: 'premium-access' });
    } else {
      navigate({ name: 'login' });
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="container-lux py-6">
        <nav className="flex items-center gap-2 text-xs text-charcoal-400 font-light">
          <button onClick={() => navigate({ name: 'home' })} className="hover:text-charcoal-700 transition-colors">Home</button>
          <ChevronRight size={12} strokeWidth={1.5} />
          <button onClick={() => navigate({ name: 'categories' })} className="hover:text-charcoal-700 transition-colors">Collections</button>
          {category && (
            <>
              <ChevronRight size={12} strokeWidth={1.5} />
              <button onClick={() => navigate({ name: 'category', slug: category.slug })} className="hover:text-charcoal-700 transition-colors">{category.name}</button>
            </>
          )}
          <ChevronRight size={12} strokeWidth={1.5} />
          <span className="text-charcoal-600">{product.name}</span>
        </nav>
      </div>

      {/* Main layout */}
      <div className="container-lux pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div>
            <ImageGallery images={product.images} alt={product.name} />
          </div>

          {/* Info */}
          <div className="lg:pt-8">
            <p className="eyebrow mb-4">{product.collection}</p>
            <h1 className="font-serif text-4xl lg:text-5xl text-charcoal-800 text-balance leading-[1.1]">{product.name}</h1>

            {category && (
              <p className="mt-5 text-sm text-charcoal-500 font-light">
                From the {category.name} collection
              </p>
            )}

            <div className="mt-8 h-px bg-ivory-300" />

            {/* Visibility / Access state */}
            {isLocked ? (
              <div className="mt-10 p-10 bg-ivory-200 text-center">
                {product.visibility === 'premium' ? (
                  <Crown size={28} strokeWidth={1} className="text-champagne-600 mx-auto mb-5" />
                ) : (
                  <Lock size={26} strokeWidth={1} className="text-charcoal-400 mx-auto mb-5" />
                )}
                <h3 className="font-serif text-2xl text-charcoal-800">
                  {product.visibility === 'premium' ? 'Private Collection' : 'Members Only'}
                </h3>
                <p className="mt-3 text-sm text-charcoal-500 font-light max-w-sm mx-auto leading-relaxed">
                  {product.visibility === 'premium'
                    ? 'This piece is reserved for authorised VK Jewellers clients. Request access to view the full collection.'
                    : 'This piece is available to registered members. Login to view the full image gallery and details.'}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handleLockedClick} size="md">
                    {product.visibility === 'premium' && role === 'registered' ? 'Request Access' : 'Login to Continue'}
                  </Button>
                  <Button variant="outline" size="md" onClick={() => navigate({ name: 'categories' })}>
                    Return to Catalogue
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mt-10">
                  <p className="text-base text-charcoal-500 font-light leading-relaxed">
                    A singular piece from our {product.collection} collection, composed by hand and presented by appointment. Each piece in this collection is unique and available exclusively through private enquiry.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-6 text-xs text-charcoal-400 font-light">
                  <span>Ref: {product.reference}</span>
                  {category && (
                    <>
                      <span className="block w-px h-3 bg-charcoal-200" />
                      <span>{category.name}</span>
                    </>
                  )}
                </div>

                {/* Enquiry CTA */}
                {role !== 'guest' && (
                  <div className="mt-10">
                    <Button size="lg" className="w-full sm:w-auto" onClick={() => setEnquiryOpen(true)}>
                      Enquire About This Piece
                    </Button>
                    <p className="mt-4 text-xs text-charcoal-400 font-light">
                      Available by private enquiry only. Our client services team will respond personally.
                    </p>
                  </div>
                )}

                {role === 'guest' && (
                  <div className="mt-10 p-6 bg-ivory-200">
                    <p className="text-sm text-charcoal-500 font-light leading-relaxed">
                      This piece is available by private enquiry.{' '}
                      <button onClick={() => navigate({ name: 'login' })} className="text-charcoal-800 underline underline-offset-4 hover:text-charcoal-500 transition-colors">
                        Login
                      </button>{' '}
                      to enquire.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && !isLocked && (
        <div className="bg-ivory-200 py-24">
          <div className="container-lux">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="eyebrow mb-3">You May Also Consider</p>
                <h2 className="font-serif text-3xl text-charcoal-800">From the {category?.name} Collection</h2>
              </div>
              <button
                onClick={() => category && navigate({ name: 'category', slug: category.slug })}
                className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-charcoal-600 hover:text-charcoal-900 transition-colors group"
              >
                View All
                <ChevronRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}

      <EnquiryModal product={product} open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </div>
  );
}
