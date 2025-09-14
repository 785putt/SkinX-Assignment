import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  // const hashed = await bcrypt.hash(password, 10);

  try {
    const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return res.status(400).json({ error: 'User already exists' })
  }
  const user = await prisma.user.create({ data: { email, password } });
  const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
  })
  res.json({ token });
  } catch (err) {
    console.error('Registration error:', err)
    res.status(500).json({ error: 'Registration failed' })
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', req.body)
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // set to false for local dev if needed
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000, // 1 hour
    })

    res.json({ success: true });
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Login failed' })
  }
});

export default router;