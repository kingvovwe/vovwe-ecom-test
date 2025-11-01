'use client';

import { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { reviewTopics } from '@/lib/mockData';

interface ReviewFiltersProps {
  selectedRatings: number[];
  setSelectedRatings: (update: React.SetStateAction<number[]>) => void;
  selectedTopics: string[];
  setSelectedTopics: (update: React.SetStateAction<string[]>) => void;
}

const ReviewFilters = ({
  selectedRatings,
  setSelectedRatings,
  selectedTopics,
  setSelectedTopics,
}: ReviewFiltersProps) => {
  
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isTopicsOpen, setIsTopicsOpen] = useState(true);

  const FilterCheckbox = ({
    id,
    label,
    value,
    type,
    isChecked,
  }: {
    id: string;
    label: React.ReactNode;
    value: string | number;
    type: 'rating' | 'topic';
    isChecked: boolean;
  }) => {
    
    const handleChange = () => {
      if (type === 'rating') {
        setSelectedRatings((prev) =>
          prev.includes(value as number)
            ? prev.filter((r) => r !== value)
            : [...prev, value as number]
        );
      } else {
        setSelectedTopics((prev) =>
          prev.includes(value as string)
            ? prev.filter((t) => t !== value)
            : [...prev, value as string]
        );
      }
    };

    return (
      <div className="flex items-center">
        <input
          id={id}
          name={type}
          type="checkbox"
          value={value}
          onChange={handleChange}
          checked={isChecked}
          className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
        />
        <label
          htmlFor={id}
          className="ml-3 flex items-center gap-1 text-sm text-gray-700 cursor-pointer"
        >
          {label}
        </label>
      </div>
    );
  };

  const AccordionSection = ({
    title,
    isOpen,
    setIsOpen,
    children,
  }: {
    title: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 py-6">
      <h3 className="-my-3 flow-root">
        <button
          type="button"
          className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-700 hover:text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-medium text-gray-900">{title}</span>
          <span className="ml-6 flex items-center">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </span>
        </button>
      </h3>
      {isOpen && <div className="pt-6 space-y-4">{children}</div>}
    </div>
  );
  
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Reviews Filter</h3>
      
      <AccordionSection
        title="Rating"
        isOpen={isRatingOpen}
        setIsOpen={setIsRatingOpen}
      >
        {[5, 4, 3, 2, 1].map((rating) => (
          <FilterCheckbox
            key={rating}
            id={`rating-${rating}`}
            value={rating}
            type="rating"
            isChecked={selectedRatings.includes(rating)}
            label={
              <>
                <span>{rating}</span>
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
              </>
            }
          />
        ))}
      </AccordionSection>

      <AccordionSection
        title="Review Topics"
        isOpen={isTopicsOpen}
        setIsOpen={setIsTopicsOpen}
      >
        {reviewTopics.map((topic) => (
          <FilterCheckbox
            key={topic}
            id={`topic-${topic.replace(/\s+/g, '-')}`}
            value={topic}
            type="topic"
            isChecked={selectedTopics.includes(topic)}
            label={topic}
          />
        ))}
      </AccordionSection>
    </div>
  );
};

export default ReviewFilters;

