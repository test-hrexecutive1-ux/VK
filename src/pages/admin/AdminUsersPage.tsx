import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useApp } from '@/context/AppContext';
import { users as initialUsers } from '@/data/mockData';
import type { User } from '@/types';
import { Crown, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function AdminUsersPage() {
  const { showToast } = useApp();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');

  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.mobile.includes(search));

  const togglePremium = (id: string) => {
    const user = users.find((u) => u.id === id);
    setUsers(users.map((u) => (u.id === id ? { ...u, premium: !u.premium } : u)));
    showToast({
      title: user?.premium ? 'Premium removed' : 'Marked as Premium',
      message: `${user?.name} ${user?.premium ? 'is no longer a premium client' : 'is now a premium client'}.`,
      variant: 'success',
    });
  };

  return (
    <AdminLayout title="Users">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-charcoal-800">Users</h1>
        <p className="mt-2 text-sm text-charcoal-400 font-light">{users.length} registered members</p>
      </div>

      <div className="mb-6 relative">
        <Search size={16} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-charcoal-400" />
        <input
          type="text"
          placeholder="Search by name or mobile…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-7 py-3 bg-transparent border-b border-charcoal-200 text-charcoal-800 placeholder:text-charcoal-300 font-light focus:outline-none focus:border-charcoal-800 transition-colors"
        />
      </div>

      <div className="bg-ivory-100 border border-ivory-300 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ivory-300">
              <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Name</th>
              <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Mobile</th>
              <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Registered</th>
              <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Status</th>
              <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Premium</th>
              <th className="text-right text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="border-b border-ivory-300 last:border-0 hover:bg-ivory-200/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm text-charcoal-800 font-medium">{user.name}</p>
                  {user.company && <p className="text-xs text-charcoal-400 font-light">{user.company}</p>}
                </td>
                <td className="px-6 py-4"><span className="text-sm text-charcoal-600 font-light">{user.mobile}</span></td>
                <td className="px-6 py-4"><span className="text-sm text-charcoal-500 font-light">{new Date(user.registeredAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span></td>
                <td className="px-6 py-4"><Badge variant={user.status === 'active' ? 'success' : 'warning'}>{user.status}</Badge></td>
                <td className="px-6 py-4">
                  {user.premium ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-champagne-700 font-medium"><Crown size={14} strokeWidth={1.5} /> Premium</span>
                  ) : (
                    <span className="text-xs text-charcoal-300 font-light">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => togglePremium(user.id)}
                    className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors ${
                      user.premium ? 'text-accent-error hover:text-accent-error/80' : 'text-charcoal-600 hover:text-charcoal-900'
                    }`}
                  >
                    {user.premium ? 'Remove Premium' : 'Mark as Premium'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
