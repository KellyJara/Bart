import { socket } from './socket';
import { store } from '../../../redux/store';
import { setChats, addMessage } from './chatSlice';

export const initSocketListeners = (userId: string) => {
  socket.emit('getChats', { userId });

  socket.on('chatsList', (data) => {
    console.log('📩 Chats recibidos en frontend:', data);
    store.dispatch(setChats(data));
  });

  socket.on('receiveMessage', (message) => {
    store.dispatch(addMessage(message));
  });
};