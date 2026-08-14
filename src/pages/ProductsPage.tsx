import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProductCard } from '@/components/product/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { useRouter } from '@/context/RouterContext';
import { categories, products } from '@/data/mockData';
import type { Visibility } from '@/types';
import { SlidersHorizontal } from 'lucide-react';

export function ProductsPage({ categorySlug, subSlug }: { categorySlug?: string; subSlug?: string }) {
  const { navigate } = useRouter();
  const [filter, setFilter] = useState<Visibility | 'all'>('all');

  const filteredProducts = useMemo(() => {
    let result = products;
    if (categorySlug) {
      const category = categories.find((c) => c.slug === categorySlug);
      if (category) result = result.filter((p) => p.categoryId === category.id);
      if (subSlug && category) {
        const sub = category.subCategories.find((s) => s.slug === subSlug);
        if (sub) result = result.filter((p) => p.subCategoryId === sub.id);
      }
    }
    if (filter !== 'all') result = result.filter((p) => p.visibility === filter);
    return result;
  }, [categorySlug, subSlug, filter]);

  const filterOptions: { value: Visibility | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'public', label: 'Public' },
    { value: 'login_required', label: 'Members Only' },
    { value: 'premium', label: 'Premium' },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="The Catalogue"
        title="All Pieces"
        subtitle="Browse the complete VK Jewellers catalogue. Some pieces are reserved for members and private clients."
      />

      <div className="container-lux pb-24 lg:pb-32">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 pb-6 border-b border-ivory-300">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} strokeWidth={1.5} className="text-charcoal-400" />
            <span className="text-[0.7rem] uppercase tracking-[0.2em] text-charcoal-500 font-medium">Filter</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 border ${
                  filter === opt.value
                    ? 'bg-charcoal-900 text-ivory-100 border-charcoal-900'
                    : 'bg-transparent text-charcoal-500 border-ivory-300 hover:border-charcoal-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <>
            <p className="text-xs text-charcoal-400 font-light mb-8">{filteredProducts.length} pieces</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            title="No pieces match this filter"
            message="Try adjusting your selection to see more of the catalogue."
            action={<Button variant="outline" onClick={() => setFilter('all')}>Show All Pieces</Button>}
          />
        )}
      </div>
    </div>
  );
}
