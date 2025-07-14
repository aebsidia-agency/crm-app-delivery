import React, { useState, useEffect, useRef } from 'react';
import { User, LogOut, ChevronDown, ChevronUp } from 'lucide-react';

const UserInfo = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    onLogout();
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
      >
        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center">
          <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-gray-900 dark:text-slate-100">{user.username}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 capitalize">{user.role}</p>
        </div>
        {isDropdownOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500 dark:text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500 dark:text-slate-400" />
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 z-50">
          <div className="p-3 border-b border-gray-200 dark:border-slate-700">
            <p className="text-sm font-medium text-gray-900 dark:text-slate-100">{user.username}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 capitalize">{user.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 p-3 text-left text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors rounded-b-xl"
          >
            <LogOut className="w-4 h-4" />
            <span>Выйти</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo; 