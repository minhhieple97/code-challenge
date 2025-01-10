import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes';
import { initializeDatabase } from './config/database';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', productRoutes);

export const startServer = async () => {
  await initializeDatabase();
  return app;
};
