import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems, 
  itemsPerPage,
  className = '' 
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="text-sm text-gray-700 dark:text-slate-300">
        Показано {startItem}-{endItem} из {totalItems} клиентов
      </div>
      
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              page === currentPage
                ? 'bg-primary-600 text-white'
                : page === '...'
                ? 'text-gray-400 dark:text-slate-500 cursor-default'
                : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
          >
            {page === '...' ? <MoreHorizontal className="w-4 h-4" /> : page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination; 