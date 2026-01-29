import { io } from 'socket.io-client';

export const socket = io('http://192.168.1.83:4000', {
  transports: ['websocket'],
});