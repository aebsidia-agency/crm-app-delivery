import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  type = 'danger'
}) => {
  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      icon: <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />,
      buttonClass: 'bg-red-600 hover:bg-red-700 text-white',
      iconBg: 'bg-red-100 dark:bg-red-500/20'
    },
    warning: {
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />,
      buttonClass: 'bg-yellow-600 hover:bg-yellow-700 text-white',
      iconBg: 'bg-yellow-100 dark:bg-yellow-500/20'
    },
    info: {
      icon: <AlertTriangle className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
      iconBg: 'bg-blue-100 dark:bg-blue-500/20'
    }
  };

  const config = typeConfig[type];

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bento-card w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-300 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.iconBg}`}>
            {config.icon}
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">{title}</h2>
        </div>
        
        <p className="text-gray-600 dark:text-slate-300 mb-6">
          {message}
        </p>
        
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`btn-primary flex-1 ${config.buttonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog; 