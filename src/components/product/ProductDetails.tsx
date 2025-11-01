import { Product } from '@/types';
interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const formattedPrice = product.price.toFixed(2);

  return (
    <div className="w-full py-4">
      <h2 className="text-sm font-medium uppercase tracking-wide text-gray-600">
        {product.category}
      </h2>

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {product.name}
      </h1>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">
            ${formattedPrice}
          </span>
        </div>
      </div>

      <div className="my-6 border-t border-gray-200" />

      <div>
        <h3 className="text-base font-medium text-gray-900">Details:</h3>
        <div className="mt-2 space-y-4">
          <p className="text-sm text-gray-700">
            Available Stock: {product.stock}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;