import { AdminLayout } from '@/components/admin/AdminLayout';
import { useRouter } from '@/context/RouterContext';
import { Button } from '@/components/ui/Button';
import { curatedCollections, products } from '@/data/mockData';
import { ArrowLeft, Eye, Users, Clock, Phone, TrendingUp } from 'lucide-react';

export function AdminAnalyticsPage({ id }: { id: string }) {
  const { navigate } = useRouter();
  const collection = curatedCollections.find((c) => c.id === id) ?? curatedCollections[0];

  const stats = [
    { label: 'Total Opens', value: collection.opens, icon: Eye, color: 'text-charcoal-700' },
    { label: 'Unique Viewers', value: collection.uniqueViewers, icon: Users, color: 'text-accent-success' },
    { label: 'Product Views', value: collection.productViews.reduce((sum, p) => sum + p.views, 0), icon: TrendingUp, color: 'text-champagne-600' },
    { label: 'Last Opened', value: collection.lastOpened ?? '—', icon: Clock, color: 'text-charcoal-500' },
  ];

  // Mock chart data
  const chartData = [4, 7, 3, 9, 6, 12, 8, 14, 10, 5, 11, 6];
  const maxChart = Math.max(...chartData);

  return (
    <AdminLayout title="Analytics">
      <button
        onClick={() => navigate({ name: 'admin-collections' })}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-charcoal-400 hover:text-charcoal-700 transition-colors mb-8"
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        Back to Collections
      </button>

      <div className="mb-10">
        <h1 className="font-serif text-3xl text-charcoal-800">{collection.name}</h1>
        <p className="mt-2 text-sm text-charcoal-400 font-light">Client: {collection.clientName} · Created {new Date(collection.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-ivory-100 border border-ivory-300 p-6 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
            <stat.icon size={18} strokeWidth={1.5} className={`${stat.color} mb-4`} />
            <p className="font-serif text-2xl text-charcoal-800">{stat.value}</p>
            <p className="mt-1 text-[0.7rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-ivory-100 border border-ivory-300 p-6">
          <h2 className="font-serif text-xl text-charcoal-800 mb-6">Opens Over Time</h2>
          <div className="flex items-end justify-between gap-2 h-48">
            {chartData.map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-charcoal-800 transition-all duration-700 ease-lux hover:bg-champagne-600"
                  style={{ height: `${(value / maxChart) * 100}%`, animationDelay: `${i * 50}ms` }}
                />
                <span className="text-[0.6rem] text-charcoal-400 font-light">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product views */}
        <div className="bg-ivory-100 border border-ivory-300 p-6">
          <h2 className="font-serif text-xl text-charcoal-800 mb-6">Product Views</h2>
          <div className="space-y-4">
            {collection.productViews.map((pv, i) => {
              const product = products.find((p) => p.id === pv.productId);
              const maxViews = Math.max(...collection.productViews.map((p) => p.views));
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-12 overflow-hidden bg-ivory-200 shrink-0">
                    {product && <img src={product.images[0]} alt="" className="w-full h-full object-cover" loading="lazy" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-charcoal-700 font-light">{pv.productName}</p>
                    <div className="mt-1.5 h-1 bg-ivory-300 rounded-full overflow-hidden">
                      <div className="h-full bg-charcoal-800 transition-all duration-700" style={{ width: `${(pv.views / maxViews) * 100}%` }} />
                    </div>
                  </div>
                  <span className="text-sm text-charcoal-600 font-medium w-8 text-right">{pv.views}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Viewer log */}
        <div className="lg:col-span-2 bg-ivory-100 border border-ivory-300 p-6">
          <h2 className="font-serif text-xl text-charcoal-800 mb-6">Viewer Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ivory-300">
                  <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium py-3">Mobile Number</th>
                  <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium py-3">Viewed At</th>
                </tr>
              </thead>
              <tbody>
                {collection.viewers.map((viewer, i) => (
                  <tr key={i} className="border-b border-ivory-300 last:border-0">
                    <td className="py-3">
                      <span className="inline-flex items-center gap-2 text-sm text-charcoal-700 font-light">
                        <Phone size={13} strokeWidth={1.5} className="text-charcoal-400" />
                        {viewer.mobile}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-charcoal-500 font-light">{viewer.viewedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
