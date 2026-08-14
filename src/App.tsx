import { AppProvider } from '@/context/AppContext';
import { RouterProvider, useRouter } from '@/context/RouterContext';
import { ToastContainer } from '@/components/ui/Toast';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { CategoryPage } from '@/pages/CategoryPage';
import { SubCategoryPage } from '@/pages/SubCategoryPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { LoginPage } from '@/pages/LoginPage';
import { OtpPage } from '@/pages/OtpPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { AccessDeniedPage } from '@/pages/AccessDeniedPage';
import { PremiumAccessPage } from '@/pages/PremiumAccessPage';
import { CuratedLandingPage } from '@/pages/CuratedLandingPage';
import { CuratedViewPage } from '@/pages/CuratedViewPage';

import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminProductsPage } from '@/pages/admin/AdminProductsPage';
import { AdminProductFormPage } from '@/pages/admin/AdminProductFormPage';
import { AdminCategoriesPage } from '@/pages/admin/AdminCategoriesPage';
import { AdminUsersPage } from '@/pages/admin/AdminUsersPage';
import { AdminPremiumUsersPage } from '@/pages/admin/AdminPremiumUsersPage';
import { AdminBulkUploadPage } from '@/pages/admin/AdminBulkUploadPage';
import { AdminCollectionsPage, AdminCollectionCreatePage } from '@/pages/admin/AdminCollectionsPage';
import { AdminAnalyticsPage } from '@/pages/admin/AdminAnalyticsPage';

function RouteRenderer() {
  const { route } = useRouter();

  // Admin login — standalone, no header/footer
  if (route.name === 'admin-login') return <AdminLoginPage />;

  // Admin pages — standalone layout
  if (route.name === 'admin-dashboard') return <AdminDashboardPage />;
  if (route.name === 'admin-products') return <AdminProductsPage />;
  if (route.name === 'admin-product-add') return <AdminProductFormPage mode="add" />;
  if (route.name === 'admin-product-edit') return <AdminProductFormPage mode="edit" productId={route.id} />;
  if (route.name === 'admin-categories') return <AdminCategoriesPage />;
  if (route.name === 'admin-users') return <AdminUsersPage />;
  if (route.name === 'admin-premium') return <AdminPremiumUsersPage />;
  if (route.name === 'admin-bulk-upload') return <AdminBulkUploadPage />;
  if (route.name === 'admin-collections') return <AdminCollectionsPage />;
  if (route.name === 'admin-collection-create') return <AdminCollectionCreatePage />;
  if (route.name === 'admin-analytics') return <AdminAnalyticsPage id={route.id} />;

  // Auth pages — standalone, no header/footer
  if (route.name === 'login') return <LoginPage />;
  if (route.name === 'register') return <RegisterPage />;
  if (route.name === 'otp') return <OtpPage />;
  if (route.name === 'access-denied') return <AccessDeniedPage />;

  // Public pages — with header and footer
  const showChrome = !['login', 'register', 'otp', 'access-denied', 'admin-login'].includes(route.name);

  if (!showChrome) {
    return <div key={route.name}>{renderRoute(route)}</div>;
  }

  return (
    <div key={route.name} className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 animate-fade-in-only">{renderRoute(route)}</main>
      <Footer />
    </div>
  );
}

function renderRoute(route: ReturnType<typeof useRouter>['route']) {
  switch (route.name) {
    case 'home': return <HomePage />;
    case 'about': return <AboutPage />;
    case 'contact': return <ContactPage />;
    case 'privacy': return <PrivacyPage />;
    case 'terms': return <TermsPage />;
    case 'categories': return <CategoriesPage />;
    case 'category': return <CategoryPage slug={route.slug} />;
    case 'subcategory': return <SubCategoryPage categorySlug={route.categorySlug} subSlug={route.subSlug} />;
    case 'products': return <ProductsPage categorySlug={route.categorySlug} subSlug={route.subSlug} />;
    case 'product': return <ProductDetailPage slug={route.slug} />;
    case 'premium-access': return <PremiumAccessPage />;
    case 'curated': return <CuratedLandingPage />;
    case 'curated-view': return <CuratedViewPage id={route.id} />;
    case 'curated-denied': return <AccessDeniedPage />;
    case 'login': return <LoginPage />;
    case 'register': return <RegisterPage />;
    case 'otp': return <OtpPage />;
    case 'access-denied': return <AccessDeniedPage />;
    default: return <HomePage />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <RouterProvider>
        <RouteRenderer />
        <ToastContainer />
      </RouterProvider>
    </AppProvider>
  );
}
