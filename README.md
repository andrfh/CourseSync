Веб-сервис для синхронизации курсов иностртанных валют относительно RUB.

Данные подтягиваются черезAPI от ЦБ РФ в формате XML и парсятся в JSON. 

Публичная страница: https://ratesexchange.vercel.app/

## **Используемые технологии:**

- **Frontend**: React.js + TanStack Query + recharts
- **Backend**: Node.js + Express.js + fetch
- **DataBase**: PostgreSQL

## Установка

1. Клонировать репозиторий

```bash
git clone https://github.com/andrfh/CourseSync.git
```

1. Установить зависимости в папке /backend

```bash
cd backend
npm i 
```

1. Создать миграции БД 

```bash
npm run migrate
```

1. Запустить сервер 

```bash
npm start
```

1. Перейти в папку /frontend и установить зависимости

```bash
cd ../frontend
npm i
```

1. Собрать проект

```bash
npm build
```

## Обзор API

Список ручек:

```jsx
- GET /api/ratesFormated — все курсы валют для главной страницы

Ответ сервера:
[
    {
        "id": "R01010",
        "code": "AUD",
        "name": "Австралийский доллар",
        "nominal": 1,
        "value": "53.5063",
        "symbol": "A$",
        "date": "07.02.2026, 00:00:00",
        "source": "www.cbr.ru",
        "updated_at": "08.02.2026, 04:49:33"
    },
    {
        "id": "R01020A",
        "code": "AZN",
        "name": "Азербайджанский манат",
        "nominal": 1,
        "value": "45.3259",
        "symbol": "₼",
        "date": "07.02.2026, 00:00:00",
        "source": "www.cbr.ru",
        "updated_at": "08.02.2026, 04:49:33"
    },
    ...
]
```

```jsx
- GET /api/ratesFormated/:id — конкретная валюта

Ответ сервера:
{
    "id": "R01010",
    "code": "AUD",
    "name": "Австралийский доллар",
    "nominal": 1,
    "value": "53.5063",
    "symbol": "A$",
    "date": "07.02.2026, 00:00:00",
    "source": "www.cbr.ru",
    "updated_at": "08.02.2026, 04:49:33"
}
```

```jsx
- GET /api/sync — синхронизация с ЦБ РФ

Ответ сервера:
{
    "msg": "succesfull updated"
}
```

```jsx
- POST /api/currency/:id/dynamic — исторические данные по двум датам

Тело запроса:
{
    "date_1": "01-08-2025",
    "date_2": "31-08-2025"
}

Ответ сервера:
{
    "currency_info": {
        "ID": "R01235",
        "DateRange1": "01.08.2025",
        "DateRange2": "31.08.2025",
        "name": "Foreign Currency Market Dynamic"
    },
    "Records": [
        {
            "id": 0,
            "date": "01.08.2025",
            "value": "80,3163"
        },
        {
            "id": 1,
            "date": "02.08.2025",
            "value": "80,3289"
        },
        {
            "id": 2,
            "date": "05.08.2025",
            "value": "79,6736"
        },
        {
            "id": 3,
            "date": "06.08.2025",
            "value": "80,0490"
        },
        ...
		 ]
}
```