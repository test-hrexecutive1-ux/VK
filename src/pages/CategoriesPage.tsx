import { PageHeader } from '@/components/layout/PageHeader';
import { CategoryCard } from '@/components/product/CategoryCard';
import { categories } from '@/data/mockData';

export function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="The Catalogue"
        title="Jewellery Collections"
        subtitle="Each category is a curated composition — explore by form, occasion, or collection."
      />
      <div className="container-lux pb-24 lg:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
