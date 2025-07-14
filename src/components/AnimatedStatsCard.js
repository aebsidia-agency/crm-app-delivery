import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedStatsCard = ({ title, value, icon, color = 'primary', delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(value);
    }, delay * 100);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const colorClasses = {
    primary: 'bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400',
    success: 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400',
    warning: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400',
    gray: 'bg-gray-100 dark:bg-slate-500/20 text-gray-600 dark:text-slate-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: delay * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2 }
      }}
      className="bento-card p-6"
    >
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay * 0.1 + 0.2 }}
        >
          <p className="text-sm font-medium text-gray-600 dark:text-slate-400">{title}</p>
          <motion.p 
            className="text-3xl font-bold text-gray-900 dark:text-slate-100 mt-1"
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {count}
          </motion.p>
        </motion.div>
        <motion.div 
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: delay * 0.1 + 0.3,
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ 
            rotate: 5, 
            scale: 1.1,
            transition: { duration: 0.2 }
          }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimatedStatsCard; 