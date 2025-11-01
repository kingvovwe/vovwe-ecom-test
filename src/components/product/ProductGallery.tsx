'use client';

import Image from 'next/image';
import { Share2, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { productImages, defaultProductImage } from '@/lib/imageMap';
import { useState, useMemo } from 'react';

interface ProductGalleryProps {
  productId: string;
  productName: string;
}

const ProductGallery = ({ productId, productName }: ProductGalleryProps) => {
  // --- 1. Create all 4 images ---
  const allImages = useMemo(() => {
    const mainImage = productImages[productId] || defaultProductImage;
    const placeholder2 = `https://placehold.co/600x750/f0f0f0/a0a0a0?text=${encodeURIComponent(
      productName
    )}%0A(2)`;
    const placeholder3 = `https://placehold.co/600x750/f0f0f0/a0a0a0?text=${encodeURIComponent(
      productName
    )}%0A(3)`;
    const placeholder4 = `https://placehold.co/600x750/f0f0f0/a0a0a0?text=${encodeURIComponent(
      productName
    )}%0A(4)`;
    return [mainImage, placeholder2, placeholder3, placeholder4];
  }, [productId, productName]);

  // --- 2. State to track the current image index ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = allImages[currentIndex];

  // --- 3. Arrow Icon Navigation Functions ---
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative flex w-full gap-3 md:gap-4">
      {/* --- Gallery Column (Image + Thumbnails) --- */}
      <div className="flex-1 w-full">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-gray-100">
          <Image
            src={currentImage}
            alt={productName}
            fill
            className="h-full w-full object-cover object-center transition-opacity duration-300"
            priority={true}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 35vw"
            key={currentImage}
            unoptimized={currentImage.includes('placehold.co')}
          />
        </div>

        {/* Thumbnail Gallery */}
        <div className="mt-4 grid grid-cols-4 gap-4">
          {allImages.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative aspect-square w-full rounded-md overflow-hidden border-2 ${
                currentIndex === idx
                  ? 'border-gray-900'
                  : 'border-transparent'
              } transition`}
            >
              <Image
                src={imgUrl}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="h-full w-full object-cover object-center"
                unoptimized={imgUrl.includes('placehold.co')}
              />
            </button>
          ))}
        </div>
      </div>

      {/* --- Icon Column --- */}
      <div className="flex flex-col gap-3 pt-1">
        <button
          className="p-3 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition shadow-md border border-gray-200"
          aria-label="Share this product"
        >
          <Share2 size={20} />
        </button>
        <button
          className="p-3 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition shadow-md border border-gray-200"
          aria-label="Add to wishlist"
        >
          <Heart size={20} />
        </button>

        <div className="h-20"></div>

        <button
          onClick={goToPrevious}
          className="p-3 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition shadow-md border border-gray-200"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goToNext}
          className="p-3 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition shadow-md border border-gray-200"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;