# SkinX-Assignment

Steps setting up backend:

1. creating/connecting new database (example sql below)
   CREATE DATABASE IF NOT EXISTS posts_db CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

2. setting up project NodeJS + Prisma (skip Prisma setup to step 5 only if you're working on project already having its Prisma & schema + migrations)
   npm i
   npm i prisma @prisma/client mysql2
   npm install prisma @prisma/client ts-node typescript express
   npx prisma init

3. creating tsconfig
   npx tsc --init

4. seed script
   node prisma/seed.js or npx ts-node scripts/seed.ts

5. migrate create table
   npx prisma migrate dev --name init
   npx prisma generate

6. run the server
   npm run dev

Optional

1. build server
   npm run build

2. run build
   npm run start

Steps setting up frontend:
