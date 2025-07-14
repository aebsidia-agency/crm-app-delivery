import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Clock,
  DollarSign,
  Users,
  Package,
  Truck
} from 'lucide-react';

const Analytics = ({ stats, timeRange = 'week' }) => {
  const getGrowthRate = (current, previous) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const getGrowthIcon = (rate) => {
    const numRate = parseFloat(rate);
    return numRate >= 0 ? 
      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" /> : 
      <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />;
  };

  const getGrowthColor = (rate) => {
    const numRate = parseFloat(rate);
    return numRate >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bento-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Новые клиенты</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-slate-100 mt-1">{stats.newCustomers}</p>
              <div className="flex items-center space-x-1 mt-2">
                {getGrowthIcon(stats.newCustomersGrowth)}
                <span className={`text-sm font-medium ${getGrowthColor(stats.newCustomersGrowth)}`}>
                  {stats.newCustomersGrowth}%
                </span>
                <span className="text-sm text-gray-500 dark:text-slate-400">с прошлой недели</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bento-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Активные заказы</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-slate-100 mt-1">{stats.activeOrders}</p>
              <div className="flex items-center space-x-1 mt-2">
                {getGrowthIcon(stats.activeOrdersGrowth)}
                <span className={`text-sm font-medium ${getGrowthColor(stats.activeOrdersGrowth)}`}>
                  {stats.activeOrdersGrowth}%
                </span>
                <span className="text-sm text-gray-500 dark:text-slate-400">с прошлой недели</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-500/20 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bento-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Доставлено сегодня</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-slate-100 mt-1">{stats.deliveredToday}</p>
              <div className="flex items-center space-x-1 mt-2">
                {getGrowthIcon(stats.deliveredGrowth)}
                <span className={`text-sm font-medium ${getGrowthColor(stats.deliveredGrowth)}`}>
                  {stats.deliveredGrowth}%
                </span>
                <span className="text-sm text-gray-500 dark:text-slate-400">с прошлой недели</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bento-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Средний чек</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-slate-100 mt-1">{stats.averageOrder} ₽</p>
              <div className="flex items-center space-x-1 mt-2">
                {getGrowthIcon(stats.averageOrderGrowth)}
                <span className={`text-sm font-medium ${getGrowthColor(stats.averageOrderGrowth)}`}>
                  {stats.averageOrderGrowth}%
                </span>
                <span className="text-sm text-gray-500 dark:text-slate-400">с прошлой недели</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Детальная аналитика */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Статусы заказов */}
        <div className="bento-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Статусы заказов</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-slate-300">Новые</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{stats.statusBreakdown.new}</span>
                <span className="text-sm text-gray-500 dark:text-slate-400">{stats.statusBreakdown.newPercentage}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-slate-300">В обработке</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{stats.statusBreakdown.processing}</span>
                <span className="text-sm text-gray-500 dark:text-slate-400">{stats.statusBreakdown.processingPercentage}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-slate-300">Доставлено</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{stats.statusBreakdown.delivered}</span>
                <span className="text-sm text-gray-500 dark:text-slate-400">{stats.statusBreakdown.deliveredPercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Временная активность */}
        <div className="bento-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Активность по времени</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                <span className="text-sm text-gray-700 dark:text-slate-300">Сегодня</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{stats.todayOrders} заказов</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                <span className="text-sm text-gray-700 dark:text-slate-300">На этой неделе</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{stats.weekOrders} заказов</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                <span className="text-sm text-gray-700 dark:text-slate-300">В этом месяце</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{stats.monthOrders} заказов</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 