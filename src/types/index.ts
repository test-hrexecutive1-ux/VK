export type Visibility = 'public' | 'login_required' | 'premium';

export type UserRole = 'guest' | 'registered' | 'premium' | 'admin';

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  slug: string;
  name: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  subCategoryId: string;
  visibility: Visibility;
  collection: string;
  reference: string;
  images: string[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  email: string;
  company?: string;
  registeredAt: string;
  status: 'active' | 'pending';
  premium: boolean;
}

export interface CuratedCollection {
  id: string;
  name: string;
  clientName: string;
  productIds: string[];
  createdAt: string;
  opens: number;
  uniqueViewers: number;
  status: 'active' | 'draft';
  lastOpened?: string;
  viewers: CollectionViewer[];
  productViews: ProductViewStat[];
}

export interface CollectionViewer {
  mobile: string;
  viewedAt: string;
}

export interface ProductViewStat {
  productId: string;
  productName: string;
  views: number;
}

export interface ActivityLog {
  id: string;
  type: 'product' | 'user' | 'collection' | 'enquiry';
  message: string;
  at: string;
}
