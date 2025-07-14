import React from 'react';
import Tooltip from './Tooltip';

const statusDescriptions = {
  'Новый': 'Заказ только что создан и ожидает обработки',
  'Собирается': 'Заказ в процессе комплектации',
  'Доставлено': 'Заказ успешно доставлен клиенту',
};

const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Новый':
        return {
          className: 'status-badge status-new',
          icon: '🆕'
        };
      case 'Собирается':
        return {
          className: 'status-badge status-processing',
          icon: '📦'
        };
      case 'Доставлено':
        return {
          className: 'status-badge status-delivered',
          icon: '✅'
        };
      default:
        return {
          className: 'status-badge bg-gray-100 text-gray-700',
          icon: '❓'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Tooltip content={statusDescriptions[status] || status}>
      <span className={config.className}>
        <span className="mr-1">{config.icon}</span>
        {status}
      </span>
    </Tooltip>
  );
};

export default StatusBadge; 