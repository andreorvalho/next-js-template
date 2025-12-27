# Full Next.js + Prisma App

This is a guide for setting up a simple **Next.js** application with **Prisma** for database management. The app includes basic user functionality, such as listing and adding users.

## Table of Contents

- [Installation](#installation)
- [Prisma Setup](#prisma-setup)
- [Seeding Database](#seeding-database)
- [API Routes](#api-routes)
- [UI Implementation](#ui-implementation)
- [Git Setup](#git-setup)
- [Running the App](#running-the-app)
- [Deploying](#deploying)

## Installation

To get started, you'll need to install the following dependencies:

```bash
npm install next react react-dom @prisma/client @next/font tailwindcss postcss autoprefixer dotenv
npm i -D ts-node typescript @types/node @types/react
```

## 2. Database Setup

Create the database in postgres:

```bash
psql postgres
```

```sql
CREATE DATABASE next_js_template;
CREATE USER next_js_template_admin WITH PASSWORD 'next_js_template_passsword';
ALTER USER next_js_template_admin CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE next_js_template TO next_js_template_admin;
```

Migrate the database:

```bash
npx dotenv-cli -e .env.development npx prisma migrate deploy
```

seed the database:

```bash
npx dotenv-cli -e .env.development npx prisma db seed
```

## 3. Run server

```bash
  npm run dev
```

## 4. Deployment on vercel

You need to create 2 new variables
JWT_SECRET=
NEXTAUTH_SECRET=

Please check the env.development.example for more variables

```bash
  npm run build
```
