'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { productImages, defaultProductImage } from '@/lib/imageMap';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formattedPrice = product.price.toFixed(2);

  // --- Look up the image ---
  const imageUrl = productImages[product.id] || defaultProductImage;

  return (
    <div className="group relative">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="h-full w-full object-cover object-center"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900 capitalize">
            {product.category}
          </h3>
          <p className="mt-1 text-sm text-gray-700 truncate">
            {product.name}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-base font-bold text-gray-900">
              ${formattedPrice}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;