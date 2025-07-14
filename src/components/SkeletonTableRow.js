import React from 'react';

const SkeletonTableRow = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4">
      <div className="h-4 w-4 bg-gray-200 dark:bg-slate-700 rounded" />
    </td>
    <td className="px-6 py-4">
      <div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
      <div className="h-3 w-24 bg-gray-100 dark:bg-slate-800 rounded" />
    </td>
    <td className="px-6 py-4">
      <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
    </td>
    <td className="px-6 py-4">
      <div className="h-6 w-20 bg-gray-200 dark:bg-slate-700 rounded-full" />
    </td>
    <td className="px-6 py-4">
      <div className="h-4 w-20 bg-gray-100 dark:bg-slate-800 rounded" />
    </td>
    <td className="px-6 py-4">
      <div className="flex space-x-2">
        <div className="h-6 w-6 bg-gray-200 dark:bg-slate-700 rounded" />
        <div className="h-6 w-6 bg-gray-200 dark:bg-slate-700 rounded" />
        <div className="h-6 w-6 bg-gray-200 dark:bg-slate-700 rounded" />
      </div>
    </td>
  </tr>
);

export default SkeletonTableRow; 