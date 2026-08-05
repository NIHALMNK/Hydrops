import type { BlogCategory } from '@/features/blog/types';

interface Props {
  categories: BlogCategory[];
  selectedCategorySlug: string;
  onSelectCategory: (slug: string) => void;
}

export function CategoryFilter({ categories, selectedCategorySlug, onSelectCategory }: Props) {
  return (
    <nav className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" aria-label="Category filter">
      {/* 'All' Chip */}
      <button
        type="button"
        onClick={() => onSelectCategory('all')}
        className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
          selectedCategorySlug === 'all'
            ? 'bg-neutral-900 text-white shadow-md'
            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80'
        }`}
      >
        All Articles
      </button>

      {/* Category Chips */}
      {categories.map((cat) => {
        const isSelected = selectedCategorySlug === cat.slug;
        return (
          <button
            key={cat.id || cat.slug}
            type="button"
            onClick={() => onSelectCategory(cat.slug)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
              isSelected
                ? 'bg-neutral-900 text-white shadow-md'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80'
            }`}
          >
            {cat.icon && <span>{cat.icon}</span>}
            <span>{cat.title}</span>
          </button>
        );
      })}
    </nav>
  );
}
