import express from 'express';
import posts from './routes/posts';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', posts);
app.use(authRoutes);

// Server start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
