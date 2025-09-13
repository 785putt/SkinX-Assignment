# SkinX-Assignment

Steps setting up backend:

1. creating/connecting new database in MySQL (example sql below)
   CREATE DATABASE IF NOT EXISTS posts_db CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

2. setting up project NodeJS + Prisma
   cd backend
   npm i
   npm i prisma @prisma/client mysql2
   npm install prisma @prisma/client ts-node typescript express

   (skip the rest of setup to step 5 only if you're working on project already having its Prisma & schema + migrations)

   npx prisma init

3. creating tsconfig
   npx tsc --init

4. seed script
   node prisma/seed.js or npx ts-node scripts/seed.ts

5. migrate create table
   npx prisma migrate dev --name "nameofchoice" (only if you're creating new model in schema)
   npx prisma migrate dev
   npx prisma generate

6. run the server
   npm run dev

Optional

1. build server
   npm run build

2. run build
   npm run start

Backend features:

- Pagination
- User Authentication (JWT)

Steps setting up frontend:

1. create NextJS app
   npx create-next-app@latest my-next-app

2. run the app
   cd my-next-app
   npm run dev
