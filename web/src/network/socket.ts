import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '@/network/constants/ApiConstants';

let socket: Socket | null = null;

export const connectSocket = (token: string): Socket => {
  if (socket) return socket;

  socket = io(BASE_URL, { transports: ['websocket'] });
  socket.on('connect', () => {
    socket?.emit('authenticate', token);
  });

  return socket;
};

export const disconnectSocket = (): void => {
  socket?.disconnect();
  socket = null;
};
