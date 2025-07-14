import React, { useState } from 'react';
import { X, User, Phone, Package } from 'lucide-react';

const AddCustomerModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    order: '',
    status: 'Новый'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.order) {
      onAdd({
        id: Date.now().toString(),
        ...formData
      });
      setFormData({ name: '', phone: '', order: '', status: 'Новый' });
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bento-card w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-300 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">Добавить клиента</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="customer-name" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Имя клиента
            </label>
            <input
              id="customer-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Введите имя клиента"
              required
            />
          </div>
          
          <div>
            <label htmlFor="customer-phone" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Телефон
            </label>
            <input
              id="customer-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              placeholder="+375 XX XXX XX XX"
              required
            />
          </div>
          
          <div>
            <label htmlFor="customer-order" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              <Package className="w-4 h-4 inline mr-2" />
              Заказ
            </label>
            <textarea
              id="customer-order"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="input-field resize-none"
              rows="3"
              placeholder="Опишите заказ клиента"
              required
            />
          </div>
          
          <div>
            <label htmlFor="customer-status" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              Статус
            </label>
            <select
              id="customer-status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input-field"
            >
              <option value="Новый">Новый</option>
              <option value="Собирается">Собирается</option>
              <option value="Доставлено">Доставлено</option>
            </select>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal; 