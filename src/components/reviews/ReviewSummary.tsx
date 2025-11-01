import { Star } from 'lucide-react';
import StarRating from '@/components/shared/StarRating';

import { reviewSummary } from '@/lib/mockData';

const ReviewSummary = () => {
  const { average, totalReviews, ratingDistribution } = reviewSummary;

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Product Reviews</h3>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-gray-200 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-900">
              {average.toFixed(1)}
            </span>
          </div>
          <StarRating rating={average} />
          <p className="text-sm text-gray-600">
            from {totalReviews} reviews
          </p>
        </div>

        <div className="flex-1 flex flex-col-reverse gap-2">
          {ratingDistribution.map(
            (item: { stars: number; count: number; percentage: number }) => (
              <div
                key={item.stars}
                className="flex items-center gap-3 w-full"
              >
                <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                  <span>{item.stars}</span>
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-900"
                    style={{ width: `${item.percentage}%` }}
                    aria-label={`${item.percentage}% of reviews are ${item.stars} stars`}
                  />
                </div>
                <span className="text-sm text-gray-600 w-10 text-right">
                  {item.count}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;

