import { PageHeader } from '@/components/layout/PageHeader';
import { ProductCard } from '@/components/product/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { useRouter } from '@/context/RouterContext';
import { categories, products } from '@/data/mockData';

export function SubCategoryPage({ categorySlug, subSlug }: { categorySlug: string; subSlug: string }) {
  const { navigate } = useRouter();
  const category = categories.find((c) => c.slug === categorySlug);
  const subCategory = category?.subCategories.find((s) => s.slug === subSlug);

  if (!category || !subCategory) {
    return (
      <div className="min-h-screen pt-32">
        <EmptyState
          title="Collection not found"
          action={<Button onClick={() => navigate({ name: 'categories' })}>View All Collections</Button>}
        />
      </div>
    );
  }

  const subProducts = products.filter((p) => p.subCategoryId === subCategory.id);

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow={category.name}
        title={subCategory.name}
        subtitle={`A selection of ${subCategory.name.toLowerCase()} from the ${category.name} collection.`}
      />
      <div className="container-lux pb-24 lg:pb-32">
        {subProducts.length > 0 ? (
          <>
            <div className="flex items-end justify-between mb-12">
              <p className="eyebrow">{subProducts.length} Pieces</p>
              <button
                onClick={() => navigate({ name: 'category', slug: category.slug })}
                className="text-xs uppercase tracking-[0.2em] text-charcoal-500 hover:text-charcoal-800 transition-colors"
              >
                Back to {category.name}
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {subProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState title="No pieces yet" message={`New ${subCategory.name.toLowerCase()} are being added to our catalogue. Please check back soon.`} />
        )}
      </div>
    </div>
  );
}
