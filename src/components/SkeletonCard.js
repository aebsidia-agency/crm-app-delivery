import React from 'react';

const SkeletonCard = () => (
  <div className="bento-card p-6 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-xl" />
        <div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
          <div className="h-3 w-24 bg-gray-100 dark:bg-slate-800 rounded" />
        </div>
      </div>
      <div className="h-6 w-20 bg-gray-200 dark:bg-slate-700 rounded-full" />
    </div>
    <div className="space-y-3">
      <div className="h-3 w-40 bg-gray-100 dark:bg-slate-800 rounded" />
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 bg-gray-100 dark:bg-slate-800 rounded" />
        <div className="h-6 w-6 bg-gray-200 dark:bg-slate-700 rounded" />
      </div>
    </div>
  </div>
);

export default SkeletonCard; 