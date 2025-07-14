import React from 'react';

const StatsCard = ({ title, value, icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400',
    success: 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400',
    warning: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400',
    gray: 'bg-gray-100 dark:bg-slate-500/20 text-gray-600 dark:text-slate-400'
  };

  return (
    <div className="bento-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-slate-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-slate-100 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard; 