import React from 'react';

const CartItemSkeleton = ({ count }) => {
    const skeletons = Array.from({ length: count }, (_, index) => (
        <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4 w-full sm:w-1/2 lg:w-1/3">
          <div className="animate-pulse w-full h-48 rounded-t-lg bg-gray-300 dark:bg-gray-700"></div>
          <div className="p-5">
            <div className="mb-2 h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-4/5"></div>
            <div className="mb-3 h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-4/6"></div>
            <div className="mb-3 h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
            <div className="flex items-center justify-end">
              <div className="mr-3 h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-28"></div>
              <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-28"></div>
            </div>
          </div>
        </div>
  ));

  return <div className='flex flex-wrap justify-center gap-5 mt-5'>{skeletons}</div>;
};

export default CartItemSkeleton;

