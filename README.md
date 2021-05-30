## The books catalog
The website contains two views:
1) The list of available books, on this page you should be able to view all available books, please skip pagination
2) Book's page, on this page you can see extra books' fields.

Book's fields:
1. Title
2. Year, 
3. Description

## Mockups
https://www.figma.com/file/zjD3uyQmHOEh1YyeyrkhXX/Books?node-id=0%3A1

## Frontend
To start frontend 
```bash
cd frontend
npm ci
npm run dev
```

## Backend
To start backend

add .env file with database config

POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_SSL=


```bash
cd backend
npm ci
npm run db:reset
npm run start:dev
```