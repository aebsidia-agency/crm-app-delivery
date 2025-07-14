import React, { useState } from 'react';
import { X, User, Lock, Package } from 'lucide-react';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Захардкоженные учетные данные админа
    const adminCredentials = {
      username: 'admin',
      password: 'admin123'
    };

    if (formData.username === adminCredentials.username && 
        formData.password === adminCredentials.password) {
      onLogin({
        username: formData.username,
        role: 'admin',
        isAuthenticated: true
      });
      setFormData({ username: '', password: '' });
      onClose();
    } else {
      setError('Неверное имя пользователя или пароль');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
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
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Вход в систему</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">Dostavim.by CRM</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Имя пользователя
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-field"
              placeholder="Введите имя пользователя"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              <Lock className="w-4 h-4 inline mr-2" />
              Пароль
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="Введите пароль"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
          
          <div className="pt-4">
            <button
              type="submit"
              className="btn-primary w-full"
            >
              Войти
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Тестовые данные: admin / admin123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal; 