import React from 'react';
import { motion } from 'framer-motion';
import { Phone, User, Package, Edit } from 'lucide-react';
import StatusBadge from './StatusBadge';

const AnimatedCustomerCard = ({ customer, onStatusChange, onEdit, index }) => {
  const handleStatusChange = (e) => {
    onStatusChange(customer.id, e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="bento-card p-6 cursor-pointer"
    >
      <motion.div 
        className="flex items-start justify-between mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center space-x-3">
          <motion.div 
            className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-xl flex items-center justify-center"
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </motion.div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-slate-100 text-lg">{customer.name}</h3>
            <div className="flex items-center space-x-2 text-gray-500 dark:text-slate-400 text-sm">
              <Phone className="w-4 h-4" />
              <span>{customer.phone}</span>
            </div>
          </div>
        </div>
        <StatusBadge status={customer.status} />
      </motion.div>
      
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
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
            <motion.button
              onClick={() => onEdit(customer)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-300 transition-colors"
              title="Редактировать"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedCustomerCard; 