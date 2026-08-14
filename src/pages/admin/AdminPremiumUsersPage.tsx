import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useApp } from '@/context/AppContext';
import { users as initialUsers } from '@/data/mockData';
import type { User } from '@/types';
import { Crown, Mail, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AdminPremiumUsersPage() {
  const { showToast } = useApp();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const premiumUsers = users.filter((u) => u.premium);

  const removePremium = (id: string) => {
    const user = users.find((u) => u.id === id);
    setUsers(users.map((u) => (u.id === id ? { ...u, premium: false } : u)));
    showToast({ title: 'Premium removed', message: `${user?.name} is no longer a premium client.`, variant: 'success' });
  };

  return (
    <AdminLayout title="Premium Users">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-charcoal-800">Premium Clients</h1>
        <p className="mt-2 text-sm text-charcoal-400 font-light">{premiumUsers.length} clients with premium access</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {premiumUsers.map((user, i) => (
          <div key={user.id} className="bg-ivory-100 border border-ivory-300 p-6 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-charcoal-900 rounded-full flex items-center justify-center">
                  <span className="font-serif text-lg text-ivory-100">{user.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-charcoal-800">{user.name}</h3>
                  <p className="text-xs text-charcoal-400 font-light">{user.mobile}</p>
                </div>
              </div>
              <Crown size={20} strokeWidth={1.5} className="text-champagne-600" />
            </div>

            <div className="space-y-2 pt-4 border-t border-ivory-300">
              {user.email && (
                <p className="flex items-center gap-2 text-xs text-charcoal-500 font-light">
                  <Mail size={13} strokeWidth={1.5} className="text-charcoal-400" /> {user.email}
                </p>
              )}
              {user.company && (
                <p className="flex items-center gap-2 text-xs text-charcoal-500 font-light">
                  <Building2 size={13} strokeWidth={1.5} className="text-charcoal-400" /> {user.company}
                </p>
              )}
              <p className="text-xs text-charcoal-400 font-light">Member since {new Date(user.registeredAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</p>
            </div>

            <div className="mt-5 pt-4 border-t border-ivory-300">
              <Button variant="outline" size="sm" className="w-full" onClick={() => removePremium(user.id)}>
                Remove Premium
              </Button>
            </div>
          </div>
        ))}
      </div>

      {premiumUsers.length === 0 && (
        <div className="text-center py-20">
          <Crown size={32} strokeWidth={1} className="text-charcoal-300 mx-auto mb-4" />
          <p className="text-charcoal-400 font-light">No premium clients yet.</p>
        </div>
      )}
    </AdminLayout>
  );
}
