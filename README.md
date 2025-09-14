# SkinX-Assignment

Steps setting up backend:

1. creating/connecting new database in MySQL (example sql below)
   CREATE DATABASE IF NOT EXISTS posts_db CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

   Set up .env in root folder containing:

   DATABASE_URL="your_db_url"
   JWT_SECRET="your_secret"

2. setting up project NodeJS + Prisma
   cd backend
   npm i

   (skip the rest of setup to step 6 only if you're working on project already having its Prisma & schema + migrations)

   npm i prisma @prisma/client mysql2
   npm install prisma @prisma/client ts-node typescript express

   npx prisma init

3. creating tsconfig
   npx tsc --init

4. seed script
   node prisma/seed.js or npx ts-node scripts/seed.ts

5. generate prisma
   npx prisma generate

6. migrate create table
   npx prisma migrate dev --name "nameofchoice" (only if you're creating new model in database)
   npx prisma migrate dev
   npx prisma db seed (optional)

7. run the server
   npm run dev

Optional

1. build server
   npm run build

2. run build
   npm run start

Backend features:

- Business logic layer
- Pagination
- User Authentication (JWT)
- Token-Session duration
- Route Middleware protection
- Prisma ORM
- CORS security

Steps setting up frontend:

1. create NextJS app
   npx create-next-app@latest my-next-app

2. run the app
   cd my-next-app
   npm run dev

3. build app & run production

Frontend features:

- Responsive UI
- Pagination
- Login & Register (token from JWT)
- Middleware
- Modular components
- Lazy loading
- SSR
- HttpOnly cookies
