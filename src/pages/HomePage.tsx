import { ArrowRight, Crown } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { Button } from '@/components/ui/Button';
import { CategoryCard } from '@/components/product/CategoryCard';
import { ProductCard } from '@/components/product/ProductCard';
import { categories, products, heroImage, editorialImage, signatureImage, premiumCtaImage } from '@/data/mockData';

export function HomePage() {
  const { navigate } = useRouter();
  const featuredCategories = categories.slice(0, 3);
  const secondaryCategories = categories.slice(3);
  const publicProducts = products.filter((p) => p.visibility === 'public').slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="VK Jewellers" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-charcoal-900/30" />
        </div>

        <div className="relative container-lux pb-24 lg:pb-32">
          <div className="max-w-2xl animate-fade-in">
            <p className="eyebrow text-ivory-200/80 mb-6">VK Jewellers — Private Catalogue</p>
            <h1 className="font-serif text-ivory-100 text-display text-balance">
              Crafted for Those<br />Who Know.
            </h1>
            <p className="mt-8 text-lg font-light text-ivory-200/80 max-w-md leading-relaxed">
              A private collection of fine jewellery, composed by hand and presented by appointment.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate({ name: 'categories' })}
                className="bg-ivory-100 text-charcoal-900 hover:bg-ivory-200 border-ivory-100"
              >
                Explore Collection
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate({ name: 'about' })}
                className="text-ivory-100 border-ivory-200/40 hover:bg-ivory-100 hover:text-charcoal-900 hover:border-ivory-100"
              >
                Discover VK Jewellers
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-ivory-200/50">
          <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
          <span className="block w-px h-12 bg-ivory-200/30 animate-pulse" />
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 lg:py-32">
        <div className="container-lux">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <p className="eyebrow mb-4">Featured Collections</p>
              <h2 className="font-serif text-display-sm text-charcoal-800">Curated by Category</h2>
            </div>
            <button
              onClick={() => navigate({ name: 'categories' })}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-charcoal-600 hover:text-charcoal-900 transition-colors group"
            >
              View All Collections
              <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredCategories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} large={i === 0} index={i} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {secondaryCategories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i + 3} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="bg-ivory-200 py-24 lg:py-32">
        <div className="container-lux">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="aspect-[4/5] overflow-hidden bg-ivory-300">
              <img src={editorialImage} alt="The VK atelier" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div>
              <p className="eyebrow mb-6">The House of VK</p>
              <h2 className="font-serif text-display-sm text-charcoal-800 text-balance">
                A Tradition of Quiet Excellence.
              </h2>
              <div className="mt-8 space-y-5 text-base text-charcoal-500 font-light leading-relaxed">
                <p>
                  For three generations, VK Jewellers has crafted fine jewellery for a private clientele who value discretion, craftsmanship, and timeless design above all else.
                </p>
                <p>
                  Each piece begins as a drawing — composed by hand, refined over weeks, and brought to life by master artisans whose work has adorned the most discerning collections in the country.
                </p>
                <p>
                  We do not sell. We invite.
                </p>
              </div>
              <div className="mt-10">
                <Button variant="outline" size="md" onClick={() => navigate({ name: 'about' })}>
                  Our Story
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Collection */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="container-lux">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="aspect-[16/12] overflow-hidden bg-ivory-200">
                <img src={signatureImage} alt="Signature Collection" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
            <div className="lg:col-span-5 lg:pl-12 order-1 lg:order-2">
              <p className="eyebrow mb-6">Signature Collection</p>
              <h2 className="font-serif text-display-sm text-charcoal-800 text-balance">
                The Aurea Bridal.
              </h2>
              <p className="mt-8 text-base text-charcoal-500 font-light leading-relaxed">
                Our most coveted bridal ensembles — composed of rare stones and hand-finished gold, each set is a singular expression of the occasion it was made for.
              </p>
              <div className="mt-10">
                <Button variant="primary" size="md" onClick={() => navigate({ name: 'category', slug: 'bridal' })}>
                  View Bridal Collection
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 lg:py-32 bg-ivory-200">
        <div className="container-lux">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Selected Pieces</p>
            <h2 className="font-serif text-display-sm text-charcoal-800">From the Catalogue</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {publicProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Client CTA */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={premiumCtaImage} alt="Private Collection" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-charcoal-900/70" />
        </div>
        <div className="relative container-lux-narrow text-center">
          <Crown size={32} strokeWidth={1} className="text-champagne-300 mx-auto mb-6" />
          <p className="eyebrow text-champagne-200/80 mb-6">Private Client Services</p>
          <h2 className="font-serif text-ivory-100 text-display-sm text-balance">
            Discover Our Private Collection.
          </h2>
          <p className="mt-8 text-lg font-light text-ivory-200/70 max-w-xl mx-auto leading-relaxed">
            A curated selection of our most exceptional pieces, available only to authorised VK Jewellers clients.
          </p>
          <div className="mt-12">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate({ name: 'premium-access' })}
              className="bg-champagne-200 text-charcoal-900 hover:bg-champagne-100 border-champagne-200"
            >
              Access Collection
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
