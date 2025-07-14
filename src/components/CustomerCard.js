import React from 'react';
import { Phone, User, Package, Edit } from 'lucide-react';
import StatusBadge from './StatusBadge';

const CustomerCard = ({ customer, onStatusChange, onEdit }) => {
  const handleStatusChange = (e) => {
    onStatusChange(customer.id, e.target.value);
  };

  return (
    <div className="bento-card p-6 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-slate-100 text-lg">{customer.name}</h3>
            <div className="flex items-center space-x-2 text-gray-500 dark:text-slate-400 text-sm">
              <Phone className="w-4 h-4" />
              <span>{customer.phone}</span>
            </div>
          </div>
        </div>
        <StatusBadge status={customer.status} />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-slate-300">
          <Package className="w-4 h-4" />
          <span className="text-sm">{customer.order}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <label htmlFor={`status-${customer.id}`} className="text-xs font-medium text-gray-500 dark:text-slate-400">Статус:</label>
            <select
              id={`status-${customer.id}`}
              value={customer.status}
              onChange={handleStatusChange}
              className="text-xs border border-gray-200 dark:border-slate-600 rounded-lg px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
            >
              <option value="Новый">Новый</option>
              <option value="Собирается">Собирается</option>
              <option value="Доставлено">Доставлено</option>
            </select>
          </div>
          
          {onEdit && (
            <button
              onClick={() => onEdit(customer)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-300 transition-colors"
              title="Редактировать"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerCard; 