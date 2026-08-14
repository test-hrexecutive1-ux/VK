import { PageHeader } from '@/components/layout/PageHeader';
import { CategoryCard } from '@/components/product/CategoryCard';
import { ProductCard } from '@/components/product/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { useRouter } from '@/context/RouterContext';
import { categories, products } from '@/data/mockData';

export function CategoryPage({ slug }: { slug: string }) {
  const { navigate } = useRouter();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="min-h-screen pt-32">
        <EmptyState
          title="Category not found"
          message="This collection does not exist or has been moved."
          action={<Button onClick={() => navigate({ name: 'categories' })}>View All Collections</Button>}
        />
      </div>
    );
  }

  const categoryProducts = products.filter((p) => p.categoryId === category.id);

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 to-charcoal-900/20" />
        <div className="absolute bottom-0 left-0 right-0 pb-12">
          <div className="container-lux">
            <p className="eyebrow text-ivory-200/80 mb-4 animate-fade-in">{category.tagline}</p>
            <h1 className="font-serif text-ivory-100 text-display-sm animate-fade-in">{category.name}</h1>
          </div>
        </div>
      </div>

      <div className="container-lux py-16 lg:py-20">
        <p className="text-lg text-charcoal-500 font-light max-w-2xl leading-relaxed">{category.description}</p>
      </div>

      {/* Sub-categories */}
      <div className="container-lux pb-16">
        <p className="eyebrow mb-8">Explore by Style</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {category.subCategories.map((sub, i) => (
            <button
              key={sub.id}
              onClick={() => navigate({ name: 'subcategory', categorySlug: category.slug, subSlug: sub.slug })}
              className="group text-left animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-ivory-200">
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-lux group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-charcoal-900/20 group-hover:bg-charcoal-900/30 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl text-ivory-100">{sub.name}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Products in this category */}
      {categoryProducts.length > 0 && (
        <div className="container-lux pb-24 lg:pb-32">
          <div className="flex items-end justify-between mb-12">
            <p className="eyebrow">All {category.name}</p>
            <p className="text-xs text-charcoal-400 font-light">{categoryProducts.length} pieces</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {categoryProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
