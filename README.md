# Dostavim.by CRM - Enterprise Edition

Современное SPA-приложение для управления клиентами компании "Dostavim.by" — доставки фермерских продуктов. Enterprise-ready версия с полным набором профессиональных инструментов.

## 🚀 Enterprise Возможности

### 📊 Управление данными
- **Zustand Store**: Централизованное управление состоянием
- **TypeScript**: Полная типизация для надежности кода
- **Валидация форм**: Yup схемы для проверки данных
- **Локальное хранение**: Persist middleware для сохранения данных

### 🎨 UI/UX
- **Бенто дизайн**: Современный минималистичный интерфейс
- **Адаптивность**: Полная поддержка мобильных устройств
- **Анимации**: Плавные переходы и hover эффекты
- **Темная тема**: Поддержка переключения тем (готово к реализации)

### 🔧 Разработка
- **ESLint + Prettier**: Автоматическое форматирование кода
- **TypeScript**: Строгая типизация
- **Тестирование**: Jest + React Testing Library
- **Husky**: Pre-commit хуки для качества кода

### 🚀 DevOps
- **CI/CD**: GitHub Actions pipeline
- **Docker**: Контейнеризация приложения
- **Nginx**: Оптимизированная конфигурация
- **Мониторинг**: Готовность к интеграции с Sentry

## 🛠 Технологический стек

### Frontend
- **React 18** - основная библиотека
- **TypeScript** - типизация
- **TailwindCSS** - стилизация
- **Zustand** - управление состоянием
- **React Hook Form** - формы
- **Yup** - валидация
- **Lucide React** - иконки
- **React Hot Toast** - уведомления

### Development Tools
- **ESLint** - линтинг кода
- **Prettier** - форматирование
- **Husky** - git hooks
- **Jest** - тестирование
- **React Testing Library** - тестирование компонентов

### DevOps
- **Docker** - контейнеризация
- **Nginx** - веб-сервер
- **GitHub Actions** - CI/CD
- **Docker Compose** - оркестрация

## 📦 Установка и запуск

### Локальная разработка

1. **Клонирование и установка:**
```bash
git clone <repository-url>
cd dostavim-crm
npm install
```

2. **Запуск в режиме разработки:**
```bash
npm start
```

3. **Проверка качества кода:**
```bash
npm run lint          # Проверка ESLint
npm run format        # Форматирование Prettier
npm run type-check    # Проверка TypeScript
npm test              # Запуск тестов
```

### Docker развертывание

1. **Сборка и запуск:**
```bash
docker-compose up --build
```

2. **Только сборка:**
```bash
docker build -t dostavim-crm .
```

## 🧪 Тестирование

```bash
# Запуск всех тестов
npm test

# Запуск с покрытием
npm run test:coverage

# Запуск в watch режиме
npm test -- --watch
```

## 🚀 CI/CD Pipeline

Проект настроен с автоматическим CI/CD pipeline:

1. **Тестирование** - ESLint, TypeScript, Jest
2. **Сборка** - Production build
3. **Деплой** - Автоматический деплой на main branch

## 📱 Функциональность

### Управление клиентами
- ✅ Добавление новых клиентов
- ✅ Редактирование информации
- ✅ Изменение статусов заказов
- ✅ Поиск и фильтрация
- ✅ Статистика и аналитика

### Статусы заказов
- 🆕 **Новый** - только что созданный заказ
- 📦 **Собирается** - заказ в обработке
- ✅ **Доставлено** - заказ выполнен

### Фильтрация и поиск
- Поиск по имени, телефону, заказу
- Фильтрация по статусу
- Сортировка по дате создания

## 🏗 Архитектура

```
src/
├── components/          # React компоненты
│   ├── UI/             # Переиспользуемые UI компоненты
│   ├── Forms/          # Компоненты форм
│   └── Layout/         # Компоненты макета
├── hooks/              # Кастомные хуки
├── store/              # Zustand stores
├── types/              # TypeScript типы
├── utils/              # Утилиты и хелперы
├── tests/              # Тесты
└── constants/          # Константы приложения
```

## 🔧 Конфигурация

### Environment Variables
```bash
REACT_APP_API_URL=https://api.dostavim.by
REACT_APP_VERSION=$npm_package_version
NODE_ENV=production
```

### TypeScript Path Mapping
```json
{
  "@/*": ["src/*"],
  "@/components/*": ["src/components/*"],
  "@/hooks/*": ["src/hooks/*"],
  "@/store/*": ["src/store/*"]
}
```

## 📊 Производительность

- **Bundle Size**: < 500KB (gzipped)
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s

## 🔒 Безопасность

- CSP headers настроены
- XSS protection включена
- Content-Type sniffing отключен
- Secure headers настроены

## 📈 Мониторинг

Готовность к интеграции с:
- **Sentry** - отслеживание ошибок
- **Google Analytics** - аналитика
- **LogRocket** - session replay
- **New Relic** - performance monitoring

## 🤝 Contributing

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 🆘 Поддержка

Для вопросов и поддержки:
- 📧 Email: support@dostavim.by
- 📱 Telegram: @dostavim_support
- 🐛 Issues: GitHub Issues

---

**Dostavim.by CRM** - Профессиональное решение для управления доставкой фермерских продуктов 🚀 