import React, { useState } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  CheckSquare, 
  Square,
  Download,
  Trash2,
  Edit,
  MoreHorizontal
} from 'lucide-react';
import CustomerCard from './CustomerCard';
import SkeletonTableRow from './SkeletonTableRow';
import Tooltip from './Tooltip';

const DataTable = ({ 
  customers, 
  onStatusChange, 
  onDelete, 
  onEdit,
  selectedItems = [],
  onSelectionChange,
  sortConfig = null,
  onSort,
  isLoading = false
}) => {
  const [showActions, setShowActions] = useState(false);

  const handleSelectAll = () => {
    if (selectedItems.length === customers.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(customers.map(c => c.id));
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      onSelectionChange(selectedItems.filter(itemId => itemId !== id));
    } else {
      onSelectionChange([...selectedItems, id]);
    }
  };

  const getSortIcon = (field) => {
    if (sortConfig?.key !== field) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  const handleSort = (field) => {
    const direction = sortConfig?.key === field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSort({ key: field, direction });
  };

  return (
    <div className="space-y-4">
      {/* Header с массовыми операциями */}
      {selectedItems.length > 0 && (
        <div className="bento-card p-4 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Выбрано {selectedItems.length} клиентов
              </span>
              <button
                onClick={() => onSelectionChange([])}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Отменить выбор
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Tooltip content="Экспортировать выбранных клиентов">
                <button className="btn-secondary flex items-center space-x-2 text-sm">
                  <Download className="w-4 h-4" />
                  <span>Экспорт</span>
                </button>
              </Tooltip>
              <Tooltip content="Удалить выбранных клиентов">
                <button className="btn-secondary flex items-center space-x-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                  <span>Удалить</span>
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      )}

      {/* Таблица */}
      <div className="bento-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={handleSelectAll}
                    className="flex items-center space-x-2 hover:text-gray-700 dark:hover:text-slate-300"
                  >
                      {selectedItems.length === customers.length ? 
                        <CheckSquare className="w-4 h-4" /> : 
                        <Square className="w-4 h-4" />
                      }
                    </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center space-x-2 hover:text-gray-700 dark:hover:text-slate-300 font-medium"
                  >
                    <span>Имя клиента</span>
                    {getSortIcon('name')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('phone')}
                    className="flex items-center space-x-2 hover:text-gray-700 dark:hover:text-slate-300 font-medium"
                  >
                    <span>Телефон</span>
                    {getSortIcon('phone')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center space-x-2 hover:text-gray-700 dark:hover:text-slate-300 font-medium"
                  >
                    <span>Статус</span>
                    {getSortIcon('status')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('createdAt')}
                    className="flex items-center space-x-2 hover:text-gray-700 dark:hover:text-slate-300 font-medium"
                  >
                    <span>Дата создания</span>
                    {getSortIcon('createdAt')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left font-medium">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonTableRow key={i} />)
                : customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleSelectItem(customer.id)}
                      className="flex items-center space-x-2"
                    >
                      {selectedItems.includes(customer.id) ? 
                        <CheckSquare className="w-4 h-4 text-primary-600 dark:text-primary-400" /> : 
                        <Square className="w-4 h-4" />
                      }
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-slate-100">{customer.name}</div>
                      <div className="text-sm text-gray-500 dark:text-slate-400">{customer.order}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-100">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={customer.status}
                      onChange={(e) => onStatusChange(customer.id, e.target.value)}
                      className="text-xs border border-gray-200 dark:border-slate-600 rounded-lg px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
                    >
                      <option value="Новый">Новый</option>
                      <option value="Собирается">Собирается</option>
                      <option value="Доставлено">Доставлено</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-slate-400">
                    {new Date(customer.createdAt).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Tooltip content="Редактировать заказ клиента">
                        <button
                          onClick={() => onEdit(customer)}
                          className="p-1 text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </Tooltip>
                      <Tooltip content="Удалить клиента">
                        <button
                          onClick={() => onDelete(customer.id)}
                          className="p-1 text-gray-400 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </Tooltip>
                      <Tooltip content="Дополнительные действия">
                        <button
                          onClick={() => setShowActions(!showActions)}
                          className="p-1 text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-300"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable; 