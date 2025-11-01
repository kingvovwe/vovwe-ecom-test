'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  getProducts,
  getCategories,
  getProductsByCategory,
} from '@/services/api';
import ProductCard from '@/components/product/ProductCard';
import { Product, Category } from '@/types';
import {
  ArrowRight,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Package,
  Award,
  Sparkles,
  Tag,
} from 'lucide-react';

export default function HomePage() {
  return (
    // Suspense is needed because CategoryFilteredPage uses useSearchParams
    <React.Suspense fallback={<HomePageSkeleton />}>
      <CategoryFilteredPage />
    </React.Suspense>
  );
}

function CategoryFilteredPage() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category');

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // This effect fetches ALL products and categories on initial load
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [allCategories, products] = await Promise.all([
        getCategories(),
        getProducts(),
      ]);

      setCategories(allCategories);
      setAllProducts(products);
      
      // Check if there's a category in the URL
      const categoryToFetch = urlCategory || 'all';
      if (categoryToFetch === 'all') {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter(p => p.category === categoryToFetch);
        setFilteredProducts(filtered);
      }
      setSelectedCategory(categoryToFetch);
      setIsLoading(false);
    }
    loadData();
  }, []);

  // This effect *only* responds to URL changes
  useEffect(() => {
    const categoryToFilter = urlCategory || 'all';
    handleFilterChange(categoryToFilter, true);
  }, [urlCategory, allProducts]);

  const categoryIcons: { [key: string]: React.ReactNode } = {
    electronics: <Zap size={16} />,
    home: <Award size={16} />,
    clothing: <Sparkles size={16} />,
    default: <Tag size={16} />,
  };

  const handleFilterChange = async (category: string, fromUrl = false) => {
    setSelectedCategory(category);
    
    if (category === 'all') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(p => p.category === category));
    }

    // Update URL without reloading page
    if (!fromUrl) {
      const href = category === 'all' ? '/' : `/?category=${category}`;
      window.history.pushState(null, '', href);
    }
  };
  
  // Get first 4 products for "New Arrivals"
  const newArrivals = allProducts.slice(0, 4);

  return (
    <div className="bg-white">
      <HeroSection />

      {newArrivals.length > 0 && (
         <ProductCarousel title="New Arrivals" products={newArrivals} />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
          Shop Our Products
        </h2>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => handleFilterChange('all')}
            className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium transition ${
              selectedCategory === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium capitalize transition ${
                selectedCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {categoryIcons[cat] || categoryIcons.default}
              {cat}
            </button>
          ))}
        </div>
        
        {/* Product Grid */}
        {isLoading ? (
          <HomePageSkeleton />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {/* No Products Found */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center col-span-full py-12">
            <ShoppingCart size={48} className="mx-auto text-gray-300" />
            <p className="mt-4 text-lg font-medium text-gray-700">
              No products found
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Try a different category or check back later!
            </p>
          </div>
        )}
      </div>
      
      <FeaturesSection />
    </div>
  );
}

// --- Sub-Components for Homepage ---

const HeroSection = () => (
  <div className="relative bg-gray-900 text-white overflow-hidden">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-48">
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          New Season Arrivals
        </h1>
        <p className="mt-6 text-lg text-gray-300">
          Discover the latest trends in electronics, fashion, and home decor.
          Quality and style, delivered to your doorstep.
        </p>
        <div className="mt-10">
          <Link
            href="#products"
            className="inline-flex items-center gap-2 rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Shop Collection
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
    <Image
      src="https://tse1.mm.bing.net/th/id/OIP.uvwp2dugfDrZtEGXHkscLAHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3"
      alt="Stylish products collection"
      fill
      className="absolute inset-0 h-full w-full object-cover z-0 opacity-30"
      priority
    />
  </div>
);

const FeaturesSection = () => (
  <div className="bg-gray-50 py-16 md:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div className="flex flex-col items-center">
          <Package size={32} className="text-gray-900" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Fast Shipping</h3>
          <p className="mt-2 text-sm text-gray-600">
            Get your orders delivered quickly and reliably.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <ShieldCheck size={32} className="text-gray-900" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Secure Payments</h3>
          <p className="mt-2 text-sm text-gray-600">
            Your transactions are safe with our encrypted checkout.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Award size={32} className="text-gray-900" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Quality Guarantee</h3>
          <p className="mt-2 text-sm text-gray-600">
            We stand by the quality of our products.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Re-using the carousel from your product page for "New Arrivals"
function ProductCarousel({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  if (!products || products.length === 0) {
    return null;
  }
  return (
    <section className="w-full py-16 md:py-24 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <Link
            href="/"
            className="text-sm font-medium text-gray-900 hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// A simple loading skeleton for the product grid
const HomePageSkeleton = () => (
   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded-md w-1/3 mb-6"></div>
        <div className="flex flex-wrap gap-2 mb-12">
          <div className="h-9 bg-gray-200 rounded-full w-24"></div>
          <div className="h-9 bg-gray-200 rounded-full w-32"></div>
          <div className="h-9 bg-gray-200 rounded-full w-28"></div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[4/5] w-full rounded-md bg-gray-200"></div>
              <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
              <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded-md w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
   </div>
);
