export type Condition = 'Brand New' | 'Like New' | 'Good' | 'Fair';

export interface College {
  id: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  domain: string;
  alternateDomains?: string[];
  badge?: string;
}

export type Category = 
  | 'All'
  | 'Books & Notes'
  | 'Bicycles & Vehicles'
  | 'Electronics & Gadgets'
  | 'Hostel & Furniture'
  | 'Lab Gear & Uniforms'
  | 'Sports & Fitness'
  | 'Fashion & Accessories';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  condition: Condition;
  images: string[];
  collegeId: string;
  collegeName: string;
  hostelLocation?: string;
  sellerName: string;
  sellerContact: string; // WhatsApp/Phone
  sellerEmail?: string;
  isNegotiable: boolean;
  postedAt: string;
  isSold?: boolean;
}

export interface StudentUser {
  id: string;
  name: string;
  email: string;
  collegeId: string;
  collegeName: string;
  domain: string;
  isVerifiedStudent: boolean;
  avatar?: string;
  phone?: string;
  hostel?: string;
}

export type Theme = 'light' | 'dark';
