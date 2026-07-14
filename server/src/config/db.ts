import mongoose from 'mongoose';
import { env } from './env';

export const connectDB = async (): Promise<void> => {
  await mongoose.connect(env.MONGODB_URI);
  console.log('MongoDB connected');
};

export const isDBConnected = (): boolean => mongoose.connection.readyState === 1;
