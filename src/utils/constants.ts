// Статусы заказов
export const ORDER_STATUSES = {
  NEW: 'Новый',
  PROCESSING: 'Собирается',
  DELIVERED: 'Доставлено',
} as const;

// Лимиты для валидации
export const VALIDATION_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 50,
  PHONE_PATTERN: /^(\+375|375)?[\s\-]?\(?[0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
  ORDER_MIN: 10,
  ORDER_MAX: 500,
  ADDRESS_MAX: 200,
  NOTES_MAX: 1000,
} as const;

// Сообщения об ошибках
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Это поле обязательно для заполнения',
  INVALID_PHONE: 'Введите корректный номер телефона (+375 XX XXX XX XX)',
  INVALID_EMAIL: 'Введите корректный email адрес',
  NAME_TOO_SHORT: `Имя должно содержать минимум ${VALIDATION_LIMITS.NAME_MIN} символа`,
  NAME_TOO_LONG: `Имя не должно превышать ${VALIDATION_LIMITS.NAME_MAX} символов`,
  ORDER_TOO_SHORT: `Описание заказа должно содержать минимум ${VALIDATION_LIMITS.ORDER_MIN} символов`,
  ORDER_TOO_LONG: `Описание заказа не должно превышать ${VALIDATION_LIMITS.ORDER_MAX} символов`,
  ADDRESS_TOO_LONG: `Адрес не должен превышать ${VALIDATION_LIMITS.ADDRESS_MAX} символов`,
  NOTES_TOO_LONG: `Заметки не должны превышать ${VALIDATION_LIMITS.NOTES_MAX} символов`,
} as const;

// Сообщения об успехе
export const SUCCESS_MESSAGES = {
  CUSTOMER_ADDED: 'Клиент успешно добавлен',
  CUSTOMER_UPDATED: 'Информация о клиенте обновлена',
  CUSTOMER_DELETED: 'Клиент удален',
  STATUS_UPDATED: 'Статус заказа обновлен',
} as const;

// Настройки приложения
export const APP_CONFIG = {
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 4000,
  ITEMS_PER_PAGE: 20,
  SEARCH_DELAY: 500,
} as const;

// Локальные ключи хранилища
export const STORAGE_KEYS = {
  CUSTOMERS: 'customers',
  SETTINGS: 'app-settings',
  THEME: 'theme',
} as const; 