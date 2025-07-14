import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Users, Package, Truck, CheckCircle, Settings, BarChart3, Grid, List } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import CustomerCard from './components/CustomerCard';
import AddCustomerModal from './components/AddCustomerModal';
import EditCustomerModal from './components/EditCustomerModal';
import LoginModal from './components/LoginModal';
import UserInfo from './components/UserInfo';
import AnimatedStatsCard from './components/AnimatedStatsCard';
import AnimatedCustomerCard from './components/AnimatedCustomerCard';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import NotificationCenter from './components/NotificationCenter';
import Pagination from './components/Pagination';
import DataTable from './components/DataTable';
import Analytics from './components/Analytics';
import ThemeToggle from './components/ThemeToggle';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';
import ConfirmDialog from './components/ConfirmDialog';
import { showToast } from './components/Toast';
import ToastContainer from './components/Toast';
import SkeletonCard from './components/SkeletonCard';
import SkeletonTableRow from './components/SkeletonTableRow';
import Tooltip from './components/Tooltip';

// Начальные данные для демонстрации
const initialCustomers = [
  {
    id: '1',
    name: 'Анна Петрова',
    phone: '+375 29 123-45-67',
    order: 'Органические овощи: морковь 2кг, картофель 5кг, лук 1кг',
    status: 'Новый',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Иван Сидоров',
    phone: '+375 33 987-65-43',
    order: 'Фермерские яйца 30шт, молоко 2л, творог 500г',
    status: 'Собирается',
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-15T09:00:00Z'
  },
  {
    id: '3',
    name: 'Мария Козлова',
    phone: '+375 25 555-12-34',
    order: 'Мед липовый 1кг, хлеб домашний 2шт, масло сливочное 200г',
    status: 'Доставлено',
    createdAt: '2024-01-13T12:00:00Z',
    updatedAt: '2024-01-14T16:00:00Z'
  },
  {
    id: '4',
    name: 'Петр Иванов',
    phone: '+375 44 777-88-99',
    order: 'Свежие фрукты: яблоки 3кг, груши 2кг, бананы 1кг',
    status: 'Новый',
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T08:30:00Z'
  },
  {
    id: '5',
    name: 'Елена Смирнова',
    phone: '+375 29 111-22-33',
    order: 'Мясные продукты: говядина 1кг, курица 2кг, свинина 500г',
    status: 'Собирается',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-15T10:15:00Z'
  }
];

function App() {
  const [customers, setCustomers] = useLocalStorage('customers', initialCustomers);
  const [filterStatus, setFilterStatus] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);
  const [isDark, setIsDark] = useLocalStorage('isDark', false);
  const [user, setUser] = useLocalStorage('user', null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' или 'table'
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const itemsPerPage = 10;

  // Имитация загрузки данных
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Фильтрация и поиск
  const filteredCustomers = useMemo(() => {
    let filtered = customers;

    // Фильтр по статусу
    if (filterStatus !== 'Все') {
      filtered = filtered.filter(customer => customer.status === filterStatus);
    }

    // Поиск
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query) ||
        customer.order.toLowerCase().includes(query)
      );
    }

    // Сортировка
    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'createdAt') {
          return sortConfig.direction === 'asc' 
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        }
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }

    return filtered;
  }, [customers, filterStatus, searchQuery, sortConfig]);

  // Пагинация
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Статистика
  const stats = useMemo(() => {
    const total = customers.length;
    const newOrders = customers.filter(c => c.status === 'Новый').length;
    const processing = customers.filter(c => c.status === 'Собирается').length;
    const delivered = customers.filter(c => c.status === 'Доставлено').length;

    return { total, newOrders, processing, delivered };
  }, [customers]);

  // Расширенная аналитика
  const analyticsStats = useMemo(() => {
    const today = new Date().toDateString();
    const todayOrders = customers.filter(c => 
      new Date(c.createdAt).toDateString() === today
    ).length;

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekOrders = customers.filter(c => 
      new Date(c.createdAt) >= weekAgo
    ).length;

    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const monthOrders = customers.filter(c => 
      new Date(c.createdAt) >= monthAgo
    ).length;

    const deliveredToday = customers.filter(c => 
      c.status === 'Доставлено' && 
      new Date(c.updatedAt).toDateString() === today
    ).length;

    return {
      newCustomers: stats.newOrders,
      newCustomersGrowth: 12.5,
      activeOrders: stats.processing,
      activeOrdersGrowth: 8.3,
      deliveredToday,
      deliveredGrowth: 15.7,
      averageOrder: 2500,
      averageOrderGrowth: 5.2,
      todayOrders,
      weekOrders,
      monthOrders,
      statusBreakdown: {
        new: stats.newOrders,
        newPercentage: Math.round((stats.newOrders / stats.total) * 100),
        processing: stats.processing,
        processingPercentage: Math.round((stats.processing / stats.total) * 100),
        delivered: stats.delivered,
        deliveredPercentage: Math.round((stats.delivered / stats.total) * 100)
      }
    };
  }, [customers, stats]);

  const handleAddCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
    showToast.success('Клиент успешно добавлен');
    setCurrentPage(1);
  };

  const handleStatusChange = (customerId, newStatus) => {
    setCustomers(customers.map(customer =>
      customer.id === customerId
        ? { ...customer, status: newStatus, updatedAt: new Date().toISOString() }
        : customer
    ));
    showToast.success('Статус заказа обновлен');
  };

  const handleDeleteCustomer = (customerId) => {
    setCustomers(customers.filter(customer => customer.id !== customerId));
    setSelectedItems(selectedItems.filter(id => id !== customerId));
    showToast.success('Клиент удален');
  };

  const handleEditCustomer = (customer) => {
    setCustomerToEdit(customer);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedCustomer) => {
    setCustomers(customers.map(customer =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    ));
    showToast.success('Клиент успешно обновлен');
    setIsEditModalOpen(false);
    setCustomerToEdit(null);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    showToast.success(`Добро пожаловать, ${userData.username}!`);
  };

  const handleLogout = () => {
    setUser(null);
    showToast.success('Вы успешно вышли из системы');
  };

  const handleSort = (config) => {
    setSortConfig(config);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleBulkDelete = () => {
    setCustomers(customers.filter(customer => !selectedItems.includes(customer.id)));
    setSelectedItems([]);
    showToast.success(`${selectedItems.length} клиентов удалено`);
  };

  // Если пользователь не авторизован, показываем форму входа
  if (!user) {
    return (
      <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
          <LoginModal
            isOpen={true}
            onClose={() => {}} // Нельзя закрыть без входа
            onLogin={handleLogin}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Dostavim.by</h1>
                  <p className="text-sm text-gray-500 dark:text-slate-400">CRM система доставки</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <ThemeToggle isDark={isDark} onToggle={handleThemeToggle} />
                <NotificationCenter />
                <UserInfo user={user} onLogout={handleLogout} />
                <Tooltip content="Аналитика">
                  <button
                    onClick={() => setShowAnalytics(!showAnalytics)}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>Аналитика</span>
                  </button>
                </Tooltip>
                <Tooltip content="Добавить нового клиента">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Добавить клиента</span>
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Аналитика */}
          {showAnalytics && (
            <div className="mb-8">
              <AdvancedAnalytics stats={analyticsStats} />
            </div>
          )}

          {/* Статистика */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AnimatedStatsCard
              title="Всего клиентов"
              value={stats.total}
              icon={<Users className="w-6 h-6" />}
              color="primary"
              delay={0}
            />
            <AnimatedStatsCard
              title="Новые заказы"
              value={stats.newOrders}
              icon={<Package className="w-6 h-6" />}
              color="primary"
              delay={1}
            />
            <AnimatedStatsCard
              title="В обработке"
              value={stats.processing}
              icon={<Truck className="w-6 h-6" />}
              color="warning"
              delay={2}
            />
            <AnimatedStatsCard
              title="Доставлено"
              value={stats.delivered}
              icon={<CheckCircle className="w-6 h-6" />}
              color="success"
              delay={3}
            />
          </div>

          {/* Фильтры и поиск */}
          <div className="bento-card p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">Клиенты</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'cards' 
                        ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-slate-100 shadow-sm' 
                        : 'text-gray-500 dark:text-slate-400'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'table' 
                        ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-slate-100 shadow-sm' 
                        : 'text-gray-500 dark:text-slate-400'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Поиск клиентов..."
                />
              </div>
              <div className="flex items-center space-x-4">
                <label htmlFor="status-filter" className="text-sm font-medium text-gray-700 dark:text-slate-300">
                  Фильтр по статусу:
                </label>
                <select
                  id="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
                >
                  <option value="Все">Все</option>
                  <option value="Новый">Новые</option>
                  <option value="Собирается">В обработке</option>
                  <option value="Доставлено">Доставленные</option>
                </select>
              </div>
            </div>
          </div>

          {/* Список клиентов */}
          {filteredCustomers.length === 0 ? (
            <EmptyState
              title={filterStatus === 'Все' ? 'Нет клиентов' : `Нет клиентов со статусом "${filterStatus}"`}
              description={
                filterStatus === 'Все' 
                  ? 'Добавьте первого клиента, нажав кнопку "Добавить клиента"'
                  : 'Попробуйте изменить фильтр или добавьте нового клиента'
              }
              actionText="Добавить клиента"
              onAction={() => setIsModalOpen(true)}
            />
          ) : (
            <>
              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                    : paginatedCustomers.map((customer, index) => (
                        <AnimatedCustomerCard
                          key={customer.id}
                          customer={customer}
                          onStatusChange={handleStatusChange}
                          onEdit={handleEditCustomer}
                          index={index}
                        />
                      ))}
                </div>
              ) : (
                <DataTable
                  customers={isLoading ? [] : paginatedCustomers}
                  onStatusChange={handleStatusChange}
                  onDelete={(id) => {
                    setCustomerToDelete(id);
                    setShowDeleteDialog(true);
                  }}
                  onEdit={handleEditCustomer}
                  selectedItems={selectedItems}
                  onSelectionChange={setSelectedItems}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  isLoading={isLoading}
                />
              )}
              
              {/* Пагинация */}
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    totalItems={filteredCustomers.length}
                    itemsPerPage={itemsPerPage}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Модальные окна */}
        <AddCustomerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddCustomer}
        />

        <EditCustomerModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setCustomerToEdit(null);
          }}
          onEdit={handleSaveEdit}
          customer={customerToEdit}
        />

        <ConfirmDialog
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={() => {
            handleDeleteCustomer(customerToDelete);
            setShowDeleteDialog(false);
            setCustomerToDelete(null);
          }}
          title="Удалить клиента"
          message="Вы уверены, что хотите удалить этого клиента? Это действие нельзя отменить."
          confirmText="Удалить"
          type="danger"
        />

        <ToastContainer />
      </div>
    </div>
  );
}

export default App; 