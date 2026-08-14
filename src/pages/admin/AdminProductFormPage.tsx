import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useRouter } from '@/context/RouterContext';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Field, TextInput, TextArea } from '@/components/ui/Field';
import { categories, products } from '@/data/mockData';
import type { Visibility } from '@/types';
import { ArrowLeft, X, Plus } from 'lucide-react';

export function AdminProductFormPage({ mode, productId }: { mode: 'add' | 'edit'; productId?: string }) {
  const { navigate } = useRouter();
  const { showToast } = useApp();

  const existing = productId ? products.find((p) => p.id === productId) : undefined;

  const [form, setForm] = useState({
    name: existing?.name ?? '',
    category: existing?.categoryId ?? categories[0].id,
    subCategory: existing?.subCategoryId ?? '',
    visibility: existing?.visibility ?? ('public' as Visibility),
    collection: existing?.collection ?? '',
    reference: existing?.reference ?? '',
    description: '',
    images: existing?.images ?? [] as string[],
  });

  const [imageInput, setImageInput] = useState('');

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setForm({ ...form, images: [...form.images, imageInput.trim()] });
      setImageInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      title: mode === 'add' ? 'Product added' : 'Product updated',
      message: form.name ? `"${form.name}" has been ${mode === 'add' ? 'added to' : 'updated in'} the catalogue.` : 'Product saved.',
      variant: 'success',
    });
    navigate({ name: 'admin-products' });
  };

  const selectedCategory = categories.find((c) => c.id === form.category);

  return (
    <AdminLayout title={mode === 'add' ? 'Add Product' : 'Edit Product'}>
      <button
        onClick={() => navigate({ name: 'admin-products' })}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-charcoal-400 hover:text-charcoal-700 transition-colors mb-8"
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        Back to Products
      </button>

      <h1 className="font-serif text-3xl text-charcoal-800 mb-10">{mode === 'add' ? 'Add New Product' : `Edit ${existing?.name ?? 'Product'}`}</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        <Field label="Product Name" required>
          <TextInput required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Aurelia Diamond Necklace" />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Field label="Category" required>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value, subCategory: '' })}
              className="w-full bg-transparent border-b border-charcoal-200 py-3 text-charcoal-800 font-light focus:outline-none focus:border-charcoal-800 transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </Field>

          <Field label="Sub-category" required>
            <select
              value={form.subCategory}
              onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
              required
              className="w-full bg-transparent border-b border-charcoal-200 py-3 text-charcoal-800 font-light focus:outline-none focus:border-charcoal-800 transition-colors"
            >
              <option value="">Select sub-category</option>
              {selectedCategory?.subCategories.map((sub) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Field label="Collection">
            <TextInput value={form.collection} onChange={(e) => setForm({ ...form, collection: e.target.value })} placeholder="e.g. Lumière" />
          </Field>
          <Field label="Reference" required>
            <TextInput required value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} placeholder="e.g. VK-NK-001" />
          </Field>
        </div>

        <Field label="Visibility" required>
          <div className="flex gap-3">
            {([
              { value: 'public', label: 'Public' },
              { value: 'login_required', label: 'Members Only' },
              { value: 'premium', label: 'Premium' },
            ] as const).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setForm({ ...form, visibility: opt.value })}
                className={`px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-medium border transition-all duration-300 ${
                  form.visibility === opt.value
                    ? 'bg-charcoal-900 text-ivory-100 border-charcoal-900'
                    : 'bg-transparent text-charcoal-500 border-ivory-300 hover:border-charcoal-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Field>

        {/* Image gallery */}
        <div>
          <label className="block text-[0.7rem] uppercase tracking-[0.2em] text-charcoal-500 font-medium mb-3">Image Gallery</label>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="Paste image URL…"
              className="flex-1 bg-transparent border-b border-charcoal-200 py-3 text-charcoal-800 placeholder:text-charcoal-300 font-light focus:outline-none focus:border-charcoal-800 transition-colors"
            />
            <Button type="button" variant="secondary" size="sm" onClick={handleAddImage}>
              <Plus size={14} strokeWidth={1.5} className="mr-1" />
              Add
            </Button>
          </div>

          {form.images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {form.images.map((img, i) => (
                <div key={i} className="relative group aspect-[3/4] overflow-hidden bg-ivory-200">
                  <img src={img} alt={`Product ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-1 right-1 bg-charcoal-900/70 text-ivory-100 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} strokeWidth={1.5} />
                  </button>
                  <span className="absolute bottom-1 left-1 bg-charcoal-900/70 text-ivory-100 text-[0.6rem] px-2 py-0.5">{i + 1}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="aspect-[3/4] max-w-[200px] border border-dashed border-charcoal-200 flex items-center justify-center text-charcoal-300 text-sm font-light">
              No images yet
            </div>
          )}
        </div>

        <div className="pt-6 flex gap-3">
          <Button type="submit" size="lg">
            {mode === 'add' ? 'Add Product' : 'Save Changes'}
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={() => navigate({ name: 'admin-products' })}>
            Cancel
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
