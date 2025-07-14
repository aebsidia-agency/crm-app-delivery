import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';

// Кастомный Tooltip для PieChart
const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const entry = payload[0].payload;
    return (
      <div className="px-4 py-2 rounded-lg shadow-lg text-xs font-medium whitespace-nowrap bg-gray-900 text-white dark:bg-slate-800 dark:text-slate-100 border border-gray-800 dark:border-slate-700">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: entry.color }}></span>
          <span>{entry.name}: <b>{entry.value}</b></span>
        </div>
      </div>
    );
  }
  return null;
};

const AdvancedAnalytics = ({ stats }) => {
  // Данные для графиков
  const weeklyData = [
    { name: 'Пн', заказы: 12, доставки: 8, доход: 24000 },
    { name: 'Вт', заказы: 19, доставки: 15, доход: 38000 },
    { name: 'Ср', заказы: 15, доставки: 12, доход: 30000 },
    { name: 'Чт', заказы: 22, доставки: 18, доход: 44000 },
    { name: 'Пт', заказы: 25, доставки: 22, доход: 50000 },
    { name: 'Сб', заказы: 18, доставки: 16, доход: 36000 },
    { name: 'Вс', заказы: 14, доставки: 11, доход: 28000 },
  ];

  const statusData = [
    { name: 'Новые', value: stats.statusBreakdown.new, color: '#3B82F6' },
    { name: 'В обработке', value: stats.statusBreakdown.processing, color: '#F59E0B' },
    { name: 'Доставлено', value: stats.statusBreakdown.delivered, color: '#10B981' },
  ];

  const monthlyData = [
    { month: 'Янв', заказы: 65, доход: 130000 },
    { month: 'Фев', заказы: 78, доход: 156000 },
    { month: 'Мар', заказы: 90, доход: 180000 },
    { month: 'Апр', заказы: 85, доход: 170000 },
    { month: 'Май', заказы: 95, доход: 190000 },
    { month: 'Июн', заказы: 88, доход: 176000 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* KPI Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div 
          className="bento-card p-6"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Общий доход</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">₽{stats.averageOrder * stats.total}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400">+12.5%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bento-card p-6"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Средний чек</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">₽{stats.averageOrder}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400">+5.2%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bento-card p-6"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Конверсия</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">87%</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400">+3.1%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bento-card p-6"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Активность</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">92%</p>
              <div className="flex items-center mt-2">
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600 dark:text-red-400">-1.2%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend Chart */}
        <motion.div 
          className="bento-card p-6"
          whileHover={{ scale: 1.01 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Тренд за неделю</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <RechartsTooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="заказы" 
                stackId="1" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.3}
              />
              <Area 
                type="monotone" 
                dataKey="доставки" 
                stackId="1" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Status Distribution */}
        <motion.div 
          className="bento-card p-6"
          whileHover={{ scale: 1.01 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Распределение статусов</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip content={<CustomPieTooltip />} cursor={false} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Monthly Revenue Chart */}
      <motion.div variants={itemVariants} className="bento-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Доход по месяцам</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <RechartsTooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Legend />
            <Bar dataKey="доход" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default AdvancedAnalytics; 