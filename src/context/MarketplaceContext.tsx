'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, College, Category, StudentUser, Theme } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockListings';
import { POPULAR_COLLEGES, getCollegeById, detectCollegeFromEmail } from '../data/colleges';

interface MarketplaceContextType {
  selectedCollegeId: string;
  setSelectedCollegeId: (id: string) => void;
  currentCollege: College | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  products: Product[];
  filteredProducts: Product[];
  addProduct: (newProd: Omit<Product, 'id' | 'postedAt'>) => void;
  isCollegeModalOpen: boolean;
  setIsCollegeModalOpen: (open: boolean) => void;
  isPostModalOpen: boolean;
  setIsPostModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  currentUser: StudentUser | null;
  loginWithEduEmail: (
    email: string,
    name: string,
    hostel?: string,
    phone?: string
  ) => { success: boolean; message: string; collegeName?: string };
  logout: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCollegeId, setSelectedCollegeIdState] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isCollegeModalOpen, setIsCollegeModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(null);
  const [theme, setTheme] = useState<Theme>('light');

  // Initialize theme & load persisted data from localStorage
  useEffect(() => {
    try {
      // 1. Theme initialization
      const savedTheme = localStorage.getItem('college_olx_theme') as Theme | null;
      const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      setTheme(initialTheme);
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // 2. Saved user initialization
      const savedUser = localStorage.getItem('college_olx_current_user');
      if (savedUser) {
        const parsedUser: StudentUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        setSelectedCollegeIdState(parsedUser.collegeId);
      } else {
        const savedCollege = localStorage.getItem('college_olx_selected_college');
        if (savedCollege) {
          setSelectedCollegeIdState(savedCollege);
        }
      }

      // 3. Saved custom products
      const savedCustomProducts = localStorage.getItem('college_olx_custom_products');
      if (savedCustomProducts) {
        const parsed = JSON.parse(savedCustomProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts((prev) => [...parsed, ...prev]);
        }
      }
    } catch (e) {
      console.error('Initialization error:', e);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    try {
      localStorage.setItem('college_olx_theme', nextTheme);
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      // ignore
    }
  };

  const setSelectedCollegeId = (id: string) => {
    setSelectedCollegeIdState(id);
    try {
      localStorage.setItem('college_olx_selected_college', id);
    } catch (e) {
      // ignore
    }
  };

  const loginWithEduEmail = (
    email: string,
    name: string,
    hostel?: string,
    phone?: string
  ): { success: boolean; message: string; collegeName?: string } => {
    const { college, domain, isEduOrAc } = detectCollegeFromEmail(email);

    if (!isEduOrAc) {
      return {
        success: false,
        message: 'Please enter a valid student educational email ending with .edu.in, .ac.in, or .edu (e.g. you@iitd.ac.in)',
      };
    }

    const detectedCollegeName = college ? college.shortName : domain.toUpperCase();
    const detectedCollegeId = college ? college.id : `dyn-${domain.replace(/\./g, '-')}`;

    const student: StudentUser = {
      id: `usr-${Date.now()}`,
      name: name.trim() || 'Campus Student',
      email: email.trim().toLowerCase(),
      collegeId: detectedCollegeId,
      collegeName: detectedCollegeName,
      domain,
      isVerifiedStudent: true,
      phone: phone?.trim(),
      hostel: hostel?.trim(),
    };

    setCurrentUser(student);
    setSelectedCollegeId(detectedCollegeId);

    try {
      localStorage.setItem('college_olx_current_user', JSON.stringify(student));
    } catch (e) {
      console.error('Failed to persist user session', e);
    }

    return {
      success: true,
      message: `Welcome ${student.name}! College detected: ${detectedCollegeName}`,
      collegeName: detectedCollegeName,
    };
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('college_olx_current_user');
    } catch (e) {
      // ignore
    }
  };

  const addProduct = (newProdData: Omit<Product, 'id' | 'postedAt'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `custom-${Date.now()}`,
      postedAt: 'Just now',
    };

    setProducts((prev) => [newProduct, ...prev]);

    try {
      const existing = localStorage.getItem('college_olx_custom_products');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newProduct);
      localStorage.setItem('college_olx_custom_products', JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save listing locally', e);
    }
  };

  const currentCollege = selectedCollegeId === 'all' ? null : getCollegeById(selectedCollegeId) || null;

  const filteredProducts = products.filter((item) => {
    if (selectedCollegeId !== 'all' && item.collegeId !== selectedCollegeId) {
      return false;
    }
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCollege = item.collegeName.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchLocation = item.hostelLocation?.toLowerCase().includes(q);

      if (!matchTitle && !matchDesc && !matchCollege && !matchCategory && !matchLocation) {
        return false;
      }
    }
    return true;
  });

  return (
    <MarketplaceContext.Provider
      value={{
        selectedCollegeId,
        setSelectedCollegeId,
        currentCollege,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        products,
        filteredProducts,
        addProduct,
        isCollegeModalOpen,
        setIsCollegeModalOpen,
        isPostModalOpen,
        setIsPostModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        selectedProduct,
        setSelectedProduct,
        currentUser,
        loginWithEduEmail,
        logout,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
