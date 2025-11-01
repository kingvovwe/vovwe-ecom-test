'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  getProductById,
  getProductsByCategory,
  getProducts,
} from '@/services/api';

import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ProductGallery from '@/components/product/ProductGallery';
import ProductDetails from '@/components/product/ProductDetails';
import ProductActions from '@/components/product/ProductActions';
import ProductCard from '@/components/product/ProductCard';
import ReviewSummary from '@/components/reviews/ReviewSummary';
import ReviewFilters from '@/components/reviews/ReviewFilters';
import ReviewList from '@/components/reviews/ReviewList';
import { Product } from '@/types';

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { productId } = params;

  // State for data ---
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]); // <-- ADDED
  const [isLoading, setIsLoading] = useState(true);

  // State for filters ---
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  // useEffect to fetch all data on client ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Fetch the main product
      const fetchedProduct = await getProductById(productId);

      if (!fetchedProduct) {
        notFound();
        return;
      }
      setProduct(fetchedProduct);

      // 2. Fetch Related Products (by category)
      const fetchedRelated = await getProductsByCategory(
        fetchedProduct.category
      );
      setRelatedProducts(
        fetchedRelated
          .filter((p) => p.id !== fetchedProduct.id)
          .slice(0, 5) // Get 5 related
      );

      // Fetch Popular Products 
      const allProducts = await getProducts();
      setPopularProducts(
        allProducts
          .filter((p) => p.id !== fetchedProduct.id) // Also filter out current
          .slice(0, 5) // Get 5 popular
      );

      setIsLoading(false);
    };

    fetchData();
  }, [productId]);

  // --- Loading Skeleton ---
  if (isLoading || !product) {
    return <ProductPageSkeleton />;
  }

  return (
    <div className="bg-white">
      {/* Main Product Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <Breadcrumbs productName={product.name} />

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          <ProductGallery
            productId={product.id}
            productName={product.name}
          />

          <div className="flex flex-col gap-8 pt-8 md:pt-0">
            <ProductDetails product={product} />
            <ProductActions productId={product.id} />
          </div>
        </section>
      </div>

      {/* Related Product */}
      <ProductCarousel title="Related Product" products={relatedProducts} />

      {/* Product Reviews */}
      <section className="w-full py-16 md:py-24 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1 flex flex-col gap-12">
            <ReviewSummary />
            <ReviewFilters
              selectedRatings={selectedRatings}
              setSelectedRatings={setSelectedRatings}
              selectedTopics={selectedTopics}
              setSelectedTopics={setSelectedTopics}
            />
          </div>
          <div className="md:col-span-2">
            <ReviewList
              selectedRatings={selectedRatings}
              selectedTopics={selectedTopics}
            />
          </div>
        </div>
      </section>

      {/* Popular this week  */}
      <ProductCarousel title="Popular this week" products={popularProducts} />

    </div>
  );
}

// ProductCarousel Component
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
    <section className="w-full py-16 md:py-24 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <Link
            href={`/?category=${products[0]?.category || ''}`}
            className="text-sm font-medium text-gray-900 hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-5 md:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Skeleton component
const ProductPageSkeleton = () => (
  <div className="animate-pulse">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-16">
      <div className="h-5 bg-gray-200 rounded-md w-1/3"></div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        <div className="aspect-[4/5] w-full rounded-md bg-gray-200"></div>
        <div className="space-y-6 pt-8 md:pt-0">
          <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-8 bg-gray-200 rounded-md w-1/3"></div>
          <div className="h-px bg-gray-200 rounded-md w-full"></div>
          <div className="h-5 bg-gray-200 rounded-md w-1/5"></div>
          <div className="h-12 bg-gray-200 rounded-md w-full"></div>
          <div className="h-12 bg-gray-200 rounded-md w-full"></div>
        </div>
      </section>
    </div>
  </div>
);