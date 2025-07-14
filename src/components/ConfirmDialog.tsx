import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
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
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
      buttonClass: 'bg-red-600 hover:bg-red-700 text-white',
      iconBg: 'bg-red-100'
    },
    warning: {
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
      buttonClass: 'bg-yellow-600 hover:bg-yellow-700 text-white',
      iconBg: 'bg-yellow-100'
    },
    info: {
      icon: <AlertTriangle className="w-6 h-6 text-blue-600" />,
      buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
      iconBg: 'bg-blue-100'
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
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.iconBg}`}>
            {config.icon}
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
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