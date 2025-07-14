import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, AlertTriangle, Info, Package, Truck } from 'lucide-react';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Симуляция входящих уведомлений
  useEffect(() => {
    const notificationTypes = [
      {
        type: 'success',
        icon: <CheckCircle className="w-5 h-5" />,
        title: 'Заказ доставлен',
        message: 'Заказ #1234 успешно доставлен клиенту',
        color: 'green'
      },
      {
        type: 'warning',
        icon: <AlertTriangle className="w-5 h-5" />,
        title: 'Новый заказ',
        message: 'Получен новый заказ от Анны Петровой',
        color: 'orange'
      },
      {
        type: 'info',
        icon: <Package className="w-5 h-5" />,
        title: 'Статус обновлен',
        message: 'Заказ #1235 переведен в статус "Собирается"',
        color: 'blue'
      },
      {
        type: 'success',
        icon: <Truck className="w-5 h-5" />,
        title: 'Доставка в пути',
        message: 'Курьер забрал заказ #1236',
        color: 'green'
      }
    ];

    const interval = setInterval(() => {
      const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const newNotification = {
        id: Date.now(),
        ...randomType,
        timestamp: new Date(),
        read: false
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
      setUnreadCount(prev => prev + 1);
    }, 10000); // Новое уведомление каждые 10 секунд

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  const getColorClasses = (color) => {
    const colors = {
      green: 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20',
      orange: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20',
      blue: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
      red: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell className="w-5 h-5 text-gray-600 dark:text-slate-300" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 z-50"
          >
            <div className="p-4 border-b border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Уведомления</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    Отметить все как прочитанные
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              <AnimatePresence>
                {notifications.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 text-center text-gray-500 dark:text-slate-400"
                  >
                    Нет уведомлений
                  </motion.div>
                ) : (
                  notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors ${
                        !notification.read ? 'bg-blue-50 dark:bg-blue-500/10' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses(notification.color)}`}>
                          {notification.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 dark:text-slate-100">
                              {notification.title}
                            </p>
                            <button
                              onClick={() => removeNotification(notification.id)}
                              className="text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-300"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-slate-500 mt-2">
                            {notification.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter; 