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

Postgres

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

## 3. Run development server

```bash
  npm run dev
```

## 4. Run tests

Setup test database and server:
```bash
psql postgres
```

```sql
CREATE DATABASE next_js_template_test;
CREATE USER next_js_template_admin_test WITH PASSWORD 'next_js_template_passsword_test';
ALTER USER next_js_template_admin_test CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE next_js_template_test TO next_js_template_admin_test;
```

create a .env.test file with a `DATABASE_URL` value using these new values as per `.env.development.example`. Also with a `JWT_SECRET`

```bash
  npx dotenv -e .env.test -- npx prisma generate
  npx dotenv -e .env.test -- npx prisma migrate reset --force
  npm run dev:test
```

Run tests on terminal
```bash
  npm run test:cypress
```

Run tests on browser
```bash
  npm run test:open
```

or to run the setup and the tests on the terminal do:

```bash
  npm dotenv -e .env.test -- npm run test
```

## 45 Deployment on vercel

You need to create 2 new variables
JWT_SECRET=
NEXTAUTH_SECRET=

Please check the env.development.example for more variables

```bash
  npm run build
```
