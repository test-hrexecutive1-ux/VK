import type { Category } from '@/types';
import { useRouter } from '@/context/RouterContext';

export function CategoryCard({ category, large = false, index = 0 }: { category: Category; large?: boolean; index?: number }) {
  const { navigate } = useRouter();

  return (
    <button
      onClick={() => navigate({ name: 'category', slug: category.slug })}
      className={`group relative block overflow-hidden bg-ivory-200 text-left w-full animate-fade-in ${
        large ? 'aspect-[16/10] lg:aspect-[16/9]' : 'aspect-[4/5]'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-lux group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10 text-left">
        <p className="text-[0.65rem] uppercase tracking-[0.25em] text-ivory-200/80 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {category.tagline}
        </p>
        <h3 className={`font-serif text-ivory-100 ${large ? 'text-4xl lg:text-5xl' : 'text-3xl'}`}>
          {category.name}
        </h3>
        <p className="mt-4 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-ivory-200/0 group-hover:text-ivory-200/90 transition-all duration-500 group-hover:gap-3">
          Explore
          <span className="block w-0 group-hover:w-8 transition-all duration-500 h-px bg-ivory-200/80" />
        </p>
      </div>
    </button>
  );
}
