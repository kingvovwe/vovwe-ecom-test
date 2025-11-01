/**
 * A reusable shimmer effect component for skeleton loading.
 */
const Shimmer = () => (
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
);

const Skeleton = ({ className }: { className: string }) => (
  <div
    className={`relative overflow-hidden rounded-md bg-gray-100 ${className}`}
  >
    <Shimmer />
  </div>
);

export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Breadcrumbs Skeleton */}
      <Skeleton className="h-6 w-1/3 mb-10" />

      {/* Main Product Section Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Side: Product Gallery Skeleton */}
        <div className="flex flex-col gap-4">
          {/* Main Image Skeleton */}
          <Skeleton className="aspect-[4/5] w-full" />

          {/* Thumbnail Skeletons */}
          <div className="grid grid-cols-5 gap-4">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
          </div>
        </div>

        {/* Right Side: Product Details Skeleton */}
        <div className="flex flex-col gap-6 pt-8 md:pt-0">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      </div>

      {/* "Related Product" Section Skeleton */}
      <div className="mt-24">
        <Skeleton className="h-8 w-1/4 mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <Skeleton className="aspect-[4/5] w-full" />
          <Skeleton className="aspect-[4/5] w-full" />
          <Skeleton className="aspect-[4/5] w-full hidden md:block" />
          <Skeleton className="aspect-[4/5] w-full hidden md:block" />
          <Skeleton className="aspect-[4/5] w-full hidden md:block" />
        </div>
      </div>
    </div>
  );
}
