import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { UserRole } from '@/types';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  variant: 'success' | 'error' | 'info';
}

interface AppState {
  role: UserRole;
  userName: string;
  setRole: (role: UserRole) => void;
  login: (role: UserRole, name?: string) => void;
  logout: () => void;
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('guest');
  const [userName, setUserName] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const login = useCallback((r: UserRole, name?: string) => {
    setRole(r);
    if (name) setUserName(name);
  }, []);

  const logout = useCallback(() => {
    setRole('guest');
    setUserName('');
  }, []);

  return (
    <AppContext.Provider value={{ role, userName, setRole, login, logout, toasts, showToast, dismissToast }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
