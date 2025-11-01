'use client';

import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewCount?: string | number;
  size?: number;
}


const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewCount,
  size = 16,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center" aria-label={`Rating: ${rating} out of 5 stars`}>
        {/* Render Full Stars */}
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className="text-yellow-400"
            fill="currentColor"
            size={size}
            aria-hidden="true"
          />
        ))}

        {/* Render Half Star */}
        {hasHalfStar && (
          <StarHalf
            key="half"
            className="text-yellow-400"
            fill="currentColor"
            size={size}
            aria-hidden="true"
          />
        )}

        {/* Render Empty Stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className="text-gray-300"
            size={size}
            aria-hidden="true"
          />
        ))}
      </div>
      
      {/* Render Review Count */}
      {reviewCount && (
        <span className="text-sm text-gray-500 font-medium">
          {reviewCount}
        </span>
      )}
    </div>
  );
};

export default StarRating;
