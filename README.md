# Slack Clone

Чат-приложение в стиле Slack с поддержкой каналов, сообщений в реальном времени и авторизации.

## Запуск проекта

### Backend

```bash
cd backend
npm install
npm run dev
```

Сервер запустится на `http://localhost:5001`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Приложение запустится на `http://localhost:5002`

## Структура проекта (FSD)

Проект использует методологию [Feature-Sliced Design](https://feature-sliced.design/) (FSD) — методологию разработки фронтенда, основанную на разделении кода по бизнес-функционалу.

### Слои FSD

```
frontend/src/
├── app/           # Слой приложения (роутинг, провайдеры, store)
├── entities/      # Бизнес-сущности (channel, messages, modal)
├── features/      # Фичи (auth, send-message)
├── pages/         # Страницы (chat, login, not-found-page)
├── shared/        # Переиспользуемый код (ui, lib, config, assets)
└── widgets/       # Виджеты (chat, header)
```

### Описание слоёв

- **app** — инициализация приложения, роутинг, глобальные провайдеры, store
- **entities** — бизнес-сущности: каналы, сообщения, модальные окна
- **features** — фичи: авторизация, отправка сообщений
- **pages** — страницы приложения
- **shared** — общие ресурсы: UI-компоненты, утилиты, конфигурации, статические файлы
- **widgets** — крупные UI-блоки, объединяющие несколько сущностей и фич