'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockReviews } from '@/lib/mockData';
import { Review } from '@/types';
import StarRating from '@/components/shared/StarRating';

interface ReviewListProps {
  selectedRatings: number[];
  selectedTopics: string[];
}

// Single Review Item component
const ReviewItem = ({ review }: { review: Review }) => (
  <div className="py-8 border-b border-gray-200">
    <div className="flex items-center mb-4">
      <Image
        src={review.avatarUrl}
        alt={review.author}
        width={40}
        height={40}
        className="rounded-full"
        unoptimized={true}
      />
      <div className="ml-4">
        <h4 className="text-sm font-medium text-gray-900">{review.author}</h4>
        <p className="text-sm text-gray-500">{review.date}</p>
      </div>
    </div>
    <div className="flex items-center mb-2">
      <StarRating rating={review.rating} />
    </div>
    <h5 className="text-base font-medium text-gray-900 mb-2">
      {review.title}
    </h5>
    <div className="mt-4 flex items-center gap-6">
      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
        <ThumbsUp size={16} />
        <span>{review.likes}</span>
      </button>
      <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
        <ThumbsDown size={16} />
      </button>
    </div>
  </div>
);

// Filter Tab Button
const FilterTab = ({ name, activeFilter, setActiveFilter, setCurrentPage }: {
  name: string,
  activeFilter: string,
  setActiveFilter: (name: string) => void,
  setCurrentPage: (page: number) => void
}) => (
  <button
    onClick={() => {
      setActiveFilter(name);
      setCurrentPage(1);
    }}
    className={`pb-2 text-sm font-medium ${
      activeFilter === name
        ? 'border-b-2 border-gray-900 text-gray-900'
        : 'text-gray-600 hover:text-gray-800'
    }`}
  >
    {name}
  </button>
);

// Pagination Component
const Pagination = ({ currentPage, totalPages, setCurrentPage }: {
  currentPage: number,
  totalPages: number,
  setCurrentPage: (page: number) => void
}) => {
    const pageNumbers: (string | number)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) {
        pageNumbers.push('...');
      }
      if (currentPage > 2) {
        pageNumbers.push(currentPage - 1);
      }
      if (currentPage !== 1 && currentPage !== totalPages) {
        pageNumbers.push(currentPage);
      }
      if (currentPage < totalPages - 1) {
        pageNumbers.push(currentPage + 1);
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }
    
    const uniquePageNumbers = Array.from(new Set(pageNumbers));

    return (
      <nav
        className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-10"
        aria-label="Pagination"
      >
        <div className="flex w-0 flex-1">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50"
          >
            <ChevronLeft size={20} className="mr-3" />
            Previous
          </button>
        </div>
        <div className="hidden md:flex">
          {uniquePageNumbers.map((number, index) =>
            typeof number === 'string' ? (
              <span
                key={`ellipsis-${index}`}
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
              >
                ...
              </span>
            ) : (
              <button
                key={number}
                onClick={() => setCurrentPage(number as number)}
                className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                  currentPage === number
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {number}
              </button>
            )
          )}
        </div>
        <div className="flex w-0 flex-1 justify-end">
          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50"
          >
            Next
            <ChevronRight size={20} className="ml-3" />
          </button>
        </div>
      </nav>
    );
  };

  
const ReviewList = ({ selectedRatings, selectedTopics }: ReviewListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('All Reviews');
  const reviewsPerPage = 5;

  const filteredReviews = mockReviews.filter((review) => {
    // 1. Filter by tabs ("With Photo", etc.)
    const tabFilter =
      activeFilter === 'All Reviews'
        ? true
        : activeFilter === 'With Photo & Video'
        ? review.withPhoto
        : review.withDescription;

    // 2. Filter by selected ratings
    const ratingFilter =
      selectedRatings.length === 0
        ? true
        : selectedRatings.includes(review.rating);

    // 3. Filter by selected topics
    const topicFilter =
      selectedTopics.length === 0
        ? true
        : review.reviewTopics.some((topic) => selectedTopics.includes(topic));
    
    return tabFilter && ratingFilter && topicFilter;
  });

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Review Lists</h3>

      <div className="flex gap-6 border-b border-gray-200 mb-6">
        <FilterTab 
          name="All Reviews" 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
          setCurrentPage={setCurrentPage} 
        />
        <FilterTab 
          name="With Photo & Video" 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
          setCurrentPage={setCurrentPage} 
        />
        <FilterTab 
          name="With Description" 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
          setCurrentPage={setCurrentPage} 
        />
      </div>

      {/* Reviews */}
      <div>
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))
        ) : (
          <p className="text-gray-600 py-8 text-center">
            No reviews match your selected filters.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          setCurrentPage={setCurrentPage} 
        />
      )}
    </div>
  );
}

export default ReviewList;

