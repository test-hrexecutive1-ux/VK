import { AdminLayout } from '@/components/admin/AdminLayout';
import { useRouter } from '@/context/RouterContext';
import { products, users, curatedCollections, activityLog } from '@/data/mockData';
import { Package, Users, Crown, Sparkles, Eye, Lock, TrendingUp, ArrowRight } from 'lucide-react';

export function AdminDashboardPage() {
  const { navigate } = useRouter();

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'text-charcoal-700' },
    { label: 'Public Products', value: products.filter((p) => p.visibility === 'public').length, icon: Eye, color: 'text-accent-success' },
    { label: 'Members Only', value: products.filter((p) => p.visibility === 'login_required').length, icon: Lock, color: 'text-champagne-600' },
    { label: 'Premium Products', value: products.filter((p) => p.visibility === 'premium').length, icon: Crown, color: 'text-charcoal-600' },
    { label: 'Registered Users', value: users.length, icon: Users, color: 'text-charcoal-700' },
    { label: 'Premium Users', value: users.filter((u) => u.premium).length, icon: Crown, color: 'text-champagne-700' },
    { label: 'Collection Links', value: curatedCollections.length, icon: Sparkles, color: 'text-charcoal-600' },
    { label: 'Total Opens', value: curatedCollections.reduce((sum, c) => sum + c.opens, 0), icon: TrendingUp, color: 'text-accent-success' },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="mb-10">
        <h1 className="font-serif text-3xl text-charcoal-800">Welcome back</h1>
        <p className="mt-2 text-sm text-charcoal-400 font-light">Here's an overview of your catalogue and clients.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-ivory-100 border border-ivory-300 p-6 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-center justify-between mb-4">
              <stat.icon size={20} strokeWidth={1.5} className={stat.color} />
            </div>
            <p className="font-serif text-3xl text-charcoal-800">{stat.value}</p>
            <p className="mt-1 text-[0.7rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <div className="lg:col-span-2 bg-ivory-100 border border-ivory-300 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl text-charcoal-800">Recent Activity</h2>
            <button className="text-xs uppercase tracking-[0.15em] text-charcoal-400 hover:text-charcoal-700 transition-colors">View all</button>
          </div>
          <div className="space-y-1">
            {activityLog.map((log) => (
              <div key={log.id} className="flex items-start gap-4 py-3 border-b border-ivory-300 last:border-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  log.type === 'product' ? 'bg-charcoal-400' :
                  log.type === 'user' ? 'bg-accent-success' :
                  log.type === 'collection' ? 'bg-champagne-400' :
                  'bg-accent-warning'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-charcoal-700 font-light">{log.message}</p>
                  <p className="text-xs text-charcoal-300 font-light mt-0.5">{log.at}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-ivory-100 border border-ivory-300 p-6">
          <h2 className="font-serif text-xl text-charcoal-800 mb-6">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: 'Add Product', route: { name: 'admin-product-add' } as const },
              { label: 'Bulk Upload', route: { name: 'admin-bulk-upload' } as const },
              { label: 'Create Collection', route: { name: 'admin-collection-create' } as const },
              { label: 'View Users', route: { name: 'admin-users' } as const },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.route)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200 transition-colors group"
              >
                {action.label}
                <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
