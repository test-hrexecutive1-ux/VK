import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useRouter } from '@/context/RouterContext';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Field, TextInput } from '@/components/ui/Field';
import { curatedCollections, products, categories } from '@/data/mockData';
import { Plus, ArrowRight, BarChart3, Copy, Check } from 'lucide-react';

export function AdminCollectionsPage() {
  const { navigate } = useRouter();

  return (
    <AdminLayout title="Curated Collections">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl text-charcoal-800">Curated Collections</h1>
          <p className="mt-2 text-sm text-charcoal-400 font-light">{curatedCollections.length} collections created</p>
        </div>
        <Button onClick={() => navigate({ name: 'admin-collection-create' })}>
          <Plus size={16} strokeWidth={1.5} className="mr-2" />
          Create Collection
        </Button>
      </div>

      <div className="bg-ivory-100 border border-ivory-300 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ivory-300">
              <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Collection</th>
              <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Products</th>
              <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Created</th>
              <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Opens</th>
              <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Viewers</th>
              <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Status</th>
              <th className="text-right text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {curatedCollections.map((col) => {
              const colProducts = col.productIds.map((id) => products.find((p) => p.id === id)).filter(Boolean);
              return (
                <tr key={col.id} className="border-b border-ivory-300 last:border-0 hover:bg-ivory-200/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm text-charcoal-800 font-medium">{col.name}</p>
                    <p className="text-xs text-charcoal-400 font-light">{col.clientName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-1.5">
                      {colProducts.slice(0, 4).map((p, i) => (
                        <div key={i} className="w-7 h-7 overflow-hidden bg-ivory-200 border border-ivory-100">
                          <img src={p!.images[0]} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      ))}
                      {colProducts.length > 4 && <div className="w-7 h-7 flex items-center justify-center bg-ivory-200 border border-ivory-100 text-[0.6rem] text-charcoal-400">+{colProducts.length - 4}</div>}
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-sm text-charcoal-500 font-light">{new Date(col.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span></td>
                  <td className="px-6 py-4"><span className="text-sm text-charcoal-600 font-medium">{col.opens}</span></td>
                  <td className="px-6 py-4"><span className="text-sm text-charcoal-600 font-medium">{col.uniqueViewers}</span></td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.1em] font-medium border ${
                      col.status === 'active' ? 'bg-accent-success/10 text-accent-success border-accent-success/30' : 'bg-ivory-200 text-charcoal-400 border-ivory-300'
                    }`}>
                      {col.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => navigate({ name: 'admin-analytics', id: col.id })}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-charcoal-500 hover:text-charcoal-900 transition-colors"
                    >
                      <BarChart3 size={14} strokeWidth={1.5} />
                      Analytics
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export function AdminCollectionCreatePage() {
  const { navigate } = useRouter();
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [clientName, setClientName] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleProduct = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  const handleGenerate = () => {
    setLinkGenerated(true);
    showToast({ title: 'Collection link generated', message: 'The private link is ready to share with your client.', variant: 'success' });
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mockLink = 'https://vkjewellers.com/collection/bridal-ananya-x7k2';

  return (
    <AdminLayout title="Create Collection">
      <button
        onClick={() => navigate({ name: 'admin-collections' })}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-charcoal-400 hover:text-charcoal-700 transition-colors mb-8"
      >
        ← Back to Collections
      </button>

      <h1 className="font-serif text-3xl text-charcoal-800 mb-10">Create Curated Collection</h1>

      <div className="max-w-4xl space-y-10">
        {/* Step 1: Details */}
        <div>
          <p className="eyebrow mb-4">Step 1 — Collection Details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Collection Name" required>
              <TextInput required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Bridal Collection for Ananya" />
            </Field>
            <Field label="Client Name" required>
              <TextInput required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. Ananya Kapoor" />
            </Field>
          </div>
        </div>

        {/* Step 2: Select products */}
        <div>
          <p className="eyebrow mb-4">Step 2 — Select Products ({selected.length} selected)</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => {
              const isSelected = selected.includes(product.id);
              const category = categories.find((c) => c.id === product.categoryId);
              return (
                <button
                  key={product.id}
                  onClick={() => toggleProduct(product.id)}
                  className={`group text-left border transition-all duration-300 ${
                    isSelected ? 'border-charcoal-900 ring-1 ring-charcoal-900' : 'border-ivory-300 hover:border-charcoal-200'
                  }`}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-ivory-200 relative">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-charcoal-900 rounded-full flex items-center justify-center">
                        <Check size={14} strokeWidth={2} className="text-ivory-100" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-[0.6rem] uppercase tracking-[0.1em] text-charcoal-400">{category?.name}</p>
                    <p className="text-sm text-charcoal-800 font-medium mt-0.5 truncate">{product.name}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Generate link */}
        <div>
          <p className="eyebrow mb-4">Step 3 — Generate Collection Link</p>
          {!linkGenerated ? (
            <div className="bg-ivory-100 border border-ivory-300 p-8 text-center">
              <p className="text-sm text-charcoal-500 font-light mb-6">
                {selected.length > 0
                  ? `${selected.length} products selected. Generate a private link to share with ${clientName || 'your client'}.`
                  : 'Select products above to generate a collection link.'}
              </p>
              <Button size="lg" onClick={handleGenerate} disabled={selected.length === 0 || !name || !clientName}>
                Generate Collection Link
              </Button>
            </div>
          ) : (
            <div className="bg-ivory-100 border border-ivory-300 p-8 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Check size={18} strokeWidth={1.5} className="text-accent-success" />
                <p className="text-sm text-charcoal-700 font-medium">Collection link generated</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={mockLink}
                  readOnly
                  className="flex-1 bg-ivory-200 border border-ivory-300 px-4 py-3 text-sm text-charcoal-700 font-light"
                />
                <Button variant="secondary" onClick={handleCopy}>
                  {copied ? <><Check size={14} strokeWidth={1.5} className="mr-1" /> Copied</> : <><Copy size={14} strokeWidth={1.5} className="mr-1" /> Copy</>}
                </Button>
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={() => navigate({ name: 'curated-view', id: 'col-001' })}>
                  Preview Collection
                  <ArrowRight size={14} strokeWidth={1.5} className="ml-2" />
                </Button>
                <Button variant="ghost" onClick={() => navigate({ name: 'admin-collections' })}>Done</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
