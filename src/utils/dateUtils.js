import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd.MM.yyyy HH:mm', { locale: ru });
};

export const formatRelativeDate = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { 
    addSuffix: true, 
    locale: ru 
  });
};

export const formatDateOnly = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd.MM.yyyy', { locale: ru });
};

export const formatTimeOnly = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'HH:mm', { locale: ru });
};

export const isToday = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const today = new Date();
  return format(dateObj, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
};

export const isYesterday = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return format(dateObj, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd');
}; 