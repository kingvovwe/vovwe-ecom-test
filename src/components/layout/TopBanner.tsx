'use client';

import { useState, useEffect } from 'react';

const TopBanner = () => {
  
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);

  useEffect(() => {
    
    if (typeof window === 'undefined') {
      return;
    }

    
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };
  return (
    <div className="w-full bg-gray-900 text-white min-h-10 flex items-center justify-center px-3 sm:px-6 lg:px-8 py-1">
      <div className="flex items-center justify-center w-full max-w-7xl mx-auto gap-2 leading-tight">

        <p className="text-[0.8rem] sm:text-sm font-medium text-center">
          New season coming! Discount 10% for all product! Checkout Now!
        </p>

        {/* Countdown Timer */}
        <span className="text-[0.65rem] sm:text-xs font-bold bg-white text-gray-900 px-1.5 sm:px-2 py-[1px] sm:py-0.5 rounded-md">
          {formatTime(timeLeft)}
        </span>
      </div>
    </div>
  );



};

export default TopBanner;
