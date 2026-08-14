import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useRouter } from '@/context/RouterContext';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { VisibilityBadge } from '@/components/ui/Badge';
import { products, categories } from '@/data/mockData';
import { Plus, Pencil, Trash2, Search, ArrowRight } from 'lucide-react';

export function AdminProductsPage() {
  const { navigate } = useRouter();
  const { showToast } = useApp();
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout title="Products">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Products</h1>
          <p className="mt-2 text-sm text-charcoal-400 font-light">{products.length} pieces in the catalogue</p>
        </div>
        <Button onClick={() => navigate({ name: 'admin-product-add' })}>
          <Plus size={16} strokeWidth={1.5} className="mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search size={16} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-charcoal-400" />
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-7 py-3 bg-transparent border-b border-charcoal-200 text-charcoal-800 placeholder:text-charcoal-300 font-light focus:outline-none focus:border-charcoal-800 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-ivory-100 border border-ivory-300 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ivory-300">
              <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Product</th>
              <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Category</th>
              <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Visibility</th>
              <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Images</th>
              <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Created</th>
              <th className="text-right text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => {
              const category = categories.find((c) => c.id === product.categoryId);
              return (
                <tr key={product.id} className="border-b border-ivory-300 last:border-0 hover:bg-ivory-200/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 overflow-hidden bg-ivory-200 shrink-0">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <p className="text-sm text-charcoal-800 font-medium">{product.name}</p>
                        <p className="text-xs text-charcoal-400 font-light">{product.reference}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-charcoal-600 font-light">{category?.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <VisibilityBadge visibility={product.visibility} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {product.images.slice(0, 3).map((img, i) => (
                        <div key={i} className="w-8 h-8 overflow-hidden bg-ivory-200 border border-ivory-100">
                          <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      ))}
                      {product.images.length > 3 && (
                        <div className="w-8 h-8 flex items-center justify-center bg-ivory-200 border border-ivory-100 text-xs text-charcoal-400">
                          +{product.images.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-charcoal-500 font-light">{new Date(product.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => navigate({ name: 'admin-product-edit', id: product.id })}
                        className="p-2 text-charcoal-400 hover:text-charcoal-800 transition-colors"
                        aria-label="Edit"
                      >
                        <Pencil size={15} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(product.id)}
                        className="p-2 text-charcoal-400 hover:text-accent-error transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 size={15} strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-charcoal-400 font-light">No products found.</div>
      )}

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm animate-fade-in-only" onClick={() => setConfirmDelete(null)} />
          <div className="relative bg-ivory-100 border border-ivory-300 shadow-elevated p-8 max-w-md w-full animate-scale-in">
            <h3 className="font-serif text-2xl text-charcoal-800">Delete this product?</h3>
            <p className="mt-3 text-sm text-charcoal-500 font-light">This action cannot be undone. The product and its images will be removed from the catalogue.</p>
            <div className="mt-8 flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancel</Button>
              <Button
                variant="danger"
                onClick={() => {
                  setConfirmDelete(null);
                  showToast({ title: 'Product deleted', message: 'The product has been removed from the catalogue.', variant: 'success' });
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
