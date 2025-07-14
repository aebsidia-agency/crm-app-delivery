import React from 'react';
import { Package, Plus } from 'lucide-react';

const EmptyState = ({ 
  title, 
  description, 
  actionText, 
  onAction, 
  icon = <Package className="w-16 h-16 text-gray-300 dark:text-slate-400" />
}) => {
  return (
    <div className="bento-card p-12 text-center">
      <div className="mx-auto mb-4">
        {icon}
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
        {description}
      </p>
      
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState; 