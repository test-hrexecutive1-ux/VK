import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Route =
  | { name: 'home' }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'privacy' }
  | { name: 'terms' }
  | { name: 'categories' }
  | { name: 'category'; slug: string }
  | { name: 'subcategory'; categorySlug: string; subSlug: string }
  | { name: 'products'; categorySlug?: string; subSlug?: string }
  | { name: 'product'; slug: string }
  | { name: 'login' }
  | { name: 'register' }
  | { name: 'otp' }
  | { name: 'access-denied' }
  | { name: 'premium-access' }
  | { name: 'curated' }
  | { name: 'curated-view'; id: string }
  | { name: 'curated-product'; collectionId: string; productSlug: string }
  | { name: 'curated-denied' }
  | { name: 'admin-login' }
  | { name: 'admin-dashboard' }
  | { name: 'admin-products' }
  | { name: 'admin-product-add' }
  | { name: 'admin-product-edit'; id: string }
  | { name: 'admin-categories' }
  | { name: 'admin-users' }
  | { name: 'admin-premium' }
  | { name: 'admin-bulk-upload' }
  | { name: 'admin-collections' }
  | { name: 'admin-collection-create' }
  | { name: 'admin-analytics'; id: string };

interface RouterState {
  route: Route;
  navigate: (route: Route) => void;
}

const RouterContext = createContext<RouterState | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>({ name: 'home' });

  const navigate = useCallback((r: Route) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}

export type { Route };
