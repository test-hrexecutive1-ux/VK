import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useApp } from '@/context/AppContext';
import { categories } from '@/data/mockData';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AdminCategoriesPage() {
  const { showToast } = useApp();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  return (
    <AdminLayout title="Categories">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Categories</h1>
          <p className="mt-2 text-sm text-charcoal-400 font-light">{categories.length} categories · {categories.reduce((sum, c) => sum + c.subCategories.length, 0)} sub-categories</p>
        </div>
        <Button>
          <Plus size={16} strokeWidth={1.5} className="mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <div key={cat.id} className="bg-ivory-100 border border-ivory-300 overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="aspect-[16/10] overflow-hidden bg-ivory-200">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-xl text-charcoal-800">{cat.name}</h3>
                  <p className="text-xs text-charcoal-400 font-light mt-1">{cat.subCategories.length} sub-categories</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-charcoal-400 hover:text-charcoal-800 transition-colors">
                    <Pencil size={14} strokeWidth={1.5} />
                  </button>
                  <button onClick={() => setConfirmDelete(cat.id)} className="p-2 text-charcoal-400 hover:text-accent-error transition-colors">
                    <Trash2 size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-ivory-300 flex flex-wrap gap-1.5">
                {cat.subCategories.map((sub) => (
                  <span key={sub.id} className="text-[0.65rem] uppercase tracking-[0.1em] text-charcoal-400 bg-ivory-200 px-2.5 py-1">{sub.name}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm animate-fade-in-only" onClick={() => setConfirmDelete(null)} />
          <div className="relative bg-ivory-100 border border-ivory-300 shadow-elevated p-8 max-w-md w-full animate-scale-in">
            <h3 className="font-serif text-2xl text-charcoal-800">Delete this category?</h3>
            <p className="mt-3 text-sm text-charcoal-500 font-light">Products in this category will need to be reassigned.</p>
            <div className="mt-8 flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancel</Button>
              <Button variant="danger" onClick={() => { setConfirmDelete(null); showToast({ title: 'Category deleted', variant: 'success' }); }}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
