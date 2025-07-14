import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
      title={isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600" />
      )}
    </button>
  );
};

export default ThemeToggle; 