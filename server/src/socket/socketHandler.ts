import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { JwtPayload } from '../types';

let ioInstance: Server | null = null;

export const initSocket = (io: Server): void => {
  ioInstance = io;

  io.on('connection', (socket: Socket) => {
    socket.on('authenticate', (token: string) => {
      try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
        socket.join(`user:${decoded.userId}`);
      } catch (err) {
        socket.disconnect();
      }
    });
  });
};

export const emitToUser = (userId: string, event: string, data: unknown): void => {
  if (!ioInstance) return;
  ioInstance.to(`user:${userId}`).emit(event, data);
};
