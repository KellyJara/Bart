import { io } from 'socket.io-client';

export const socket = io(
  'https://bart-backend-c9905c88d7fa.herokuapp.com',
  {
    autoConnect: false,
  }
);