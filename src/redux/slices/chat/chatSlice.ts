// src/redux/slices/chat/chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Message = {
  senderId: string;
  text: string;
  timestamp: string;
};

type Chat = {
  chatId: string;
  productId: string;
  productName: string;
  buyerId: string;
  sellerId: string;
  messages: Message[];
};

interface ChatState {
  chats: Chat[];
  loading: boolean;
}

const initialState: ChatState = {
  chats: [],
  loading: false,
};

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    // Setea todos los chats (por ejemplo cuando los recibes del backend)
    setChats(state, action: PayloadAction<Chat[]>) {
      state.chats = action.payload;
      state.loading = false;
    },
    // Agrega un chat nuevo (si no existe)
    addChat(state, action: PayloadAction<Chat>) {
      const exists = state.chats.find(c => c.chatId === action.payload.chatId);
      if (!exists) {
        state.chats.push(action.payload);
      }
    },
    // Agrega un mensaje a un chat existente
    addMessage(state, action: PayloadAction<{ chatId: string; message: Message }>) {
      const chat = state.chats.find(c => c.chatId === action.payload.chatId);
      if (chat) {
        chat.messages.push(action.payload.message);
      }
    },
    // Cambiar loading manualmente si lo necesitas
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setChats, addChat, addMessage, setLoading } = chatSlice.actions;
export default chatSlice.reducer;
