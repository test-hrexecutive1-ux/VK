import type { ReactNode } from 'react';
import { useState } from 'react';
import { useRouter, type Route } from '@/context/RouterContext';
import { useApp } from '@/context/AppContext';
import {
  LayoutDashboard, Package, FolderTree, Users, Crown, Upload, Sparkles, BarChart3, Settings,
  LogOut, Menu, X, ChevronRight,
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: typeof LayoutDashboard;
  route: Route;
  match: string[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, route: { name: 'admin-dashboard' }, match: ['admin-dashboard'] },
  { label: 'Products', icon: Package, route: { name: 'admin-products' }, match: ['admin-products', 'admin-product-add', 'admin-product-edit'] },
  { label: 'Categories', icon: FolderTree, route: { name: 'admin-categories' }, match: ['admin-categories'] },
  { label: 'Users', icon: Users, route: { name: 'admin-users' }, match: ['admin-users'] },
  { label: 'Premium Users', icon: Crown, route: { name: 'admin-premium' }, match: ['admin-premium'] },
  { label: 'Bulk Upload', icon: Upload, route: { name: 'admin-bulk-upload' }, match: ['admin-bulk-upload'] },
  { label: 'Curated Collections', icon: Sparkles, route: { name: 'admin-collections' }, match: ['admin-collections', 'admin-collection-create'] },
  { label: 'Analytics', icon: BarChart3, route: { name: 'admin-analytics', id: 'col-001' }, match: ['admin-analytics'] },
];

export function AdminLayout({ children, title }: { children: ReactNode; title: string }) {
  const { route, navigate } = useRouter();
  const { logout } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNav = (r: Route) => {
    navigate(r);
    setSidebarOpen(false);
  };

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="px-6 py-6 border-b border-charcoal-700">
        <button onClick={() => navigate({ name: 'home' })} className="flex items-baseline gap-2">
          <span className="font-serif text-2xl text-ivory-100">VK</span>
          <span className="font-sans text-[0.55rem] uppercase tracking-[0.3em] text-ivory-300/50">Admin</span>
        </button>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.match.includes(route.name);
          return (
            <button
              key={item.label}
              onClick={() => handleNav(item.route)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-300 rounded-sm ${
                isActive
                  ? 'bg-charcoal-700 text-ivory-100'
                  : 'text-charcoal-300 hover:text-ivory-100 hover:bg-charcoal-700/50'
              }`}
            >
              <item.icon size={17} strokeWidth={1.5} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-charcoal-700 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-charcoal-300 hover:text-ivory-100 hover:bg-charcoal-700/50 transition-colors rounded-sm">
          <Settings size={17} strokeWidth={1.5} />
          Settings
        </button>
        <button
          onClick={() => {
            logout();
            navigate({ name: 'admin-login' });
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-charcoal-300 hover:text-ivory-100 hover:bg-charcoal-700/50 transition-colors rounded-sm"
        >
          <LogOut size={17} strokeWidth={1.5} />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-ivory-100 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 bg-charcoal-900 fixed inset-y-0 left-0 z-30">
        {sidebar}
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-charcoal-900 animate-slide-down">
            <button onClick={() => setSidebarOpen(false)} className="absolute top-5 right-5 text-ivory-300">
              <X size={20} strokeWidth={1.5} />
            </button>
            {sidebar}
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-ivory-100/95 backdrop-blur-md border-b border-ivory-300 px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-charcoal-700">
              <Menu size={22} strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-2 text-xs text-charcoal-400 font-light">
              <span>Admin</span>
              <ChevronRight size={12} strokeWidth={1.5} />
              <span className="text-charcoal-700">{title}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-charcoal-400 font-light">Signed in as Administrator</span>
          </div>
        </header>

        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
