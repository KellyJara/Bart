import { Dispatch } from '@reduxjs/toolkit';
import { Chat, socket, setCurrentChat } from '../slices/chat/chatSlice';
import { Product } from '../types/product.type';

export const startChatWithProduct = (product: Product, userId: string, dispatch: Dispatch) => {
  socket.emit('createChat', {
    productId: product._id,
    buyerId: userId,
    sellerId: product.owner._id,
  });

  const handleChatCreated = (chat: Chat) => {
    dispatch(setCurrentChat({
      ...chat,
      product, // agregamos info completa del producto
    }));
    socket.off('chatCreated', handleChatCreated); // removemos listener
  };

  socket.on('chatCreated', handleChatCreated);
};
