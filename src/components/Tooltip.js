import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({ children, content, position = 'top', delay = 200, className = '' }) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };
  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  return (
    <span className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: position === 'top' ? 8 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === 'top' ? 8 : -8 }}
            transition={{ duration: 0.18 }}
            className={`absolute z-50 px-3 py-2 rounded-lg shadow-lg text-xs font-medium whitespace-nowrap
              bg-gray-900 text-white dark:bg-slate-800 dark:text-slate-100 border border-gray-800 dark:border-slate-700
              ${position === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' : 'top-full left-1/2 -translate-x-1/2 mt-2'}
              ${className}`}
            style={{ pointerEvents: 'none' }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default Tooltip; 