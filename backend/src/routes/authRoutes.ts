import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password } });
  res.json(user);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, 'your_jwt_secret');
  res.json({ token });
});

export default router;