import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

// Типы уведомлений
export const ToastType = 'success' | 'error' | 'warning' | 'info';

// Конфигурация для разных типов уведомлений
const toastConfig = {
  success: {
    icon: <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />,
    className: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-300',
  },
  error: {
    icon: <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />,
    className: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-300',
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />,
    className: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-500/10 dark:border-yellow-500/20 dark:text-yellow-300',
  },
  info: {
    icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    className: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-300',
  },
};

// Функции для показа уведомлений
export const showToast = {
  success: (message) => {
    const config = toastConfig.success;
    toast.success(message, {
      icon: config.icon,
      style: {
        background: 'white',
        border: '1px solid #d1d5db',
        borderRadius: '12px',
        padding: '12px 16px',
      },
    });
  },
  
  error: (message) => {
    const config = toastConfig.error;
    toast.error(message, {
      icon: config.icon,
      style: {
        background: 'white',
        border: '1px solid #d1d5db',
        borderRadius: '12px',
        padding: '12px 16px',
      },
    });
  },
  
  warning: (message) => {
    const config = toastConfig.warning;
    toast(message, {
      icon: config.icon,
      style: {
        background: 'white',
        border: '1px solid #d1d5db',
        borderRadius: '12px',
        padding: '12px 16px',
      },
    });
  },
  
  info: (message) => {
    const config = toastConfig.info;
    toast(message, {
      icon: config.icon,
      style: {
        background: 'white',
        border: '1px solid #d1d5db',
        borderRadius: '12px',
        padding: '12px 16px',
      },
    });
  },
};

// Компонент для рендера уведомлений
export const ToastContainer = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'white',
          border: '1px solid #d1d5db',
          borderRadius: '12px',
          padding: '12px 16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      }}
    />
  );
};

export default ToastContainer; 