import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import productReducer from './slices/product/productSlice';
import chatReducer from './slices/chat/chatSlice';
import userReducer from './slices/user/user';
import cartReducer from './slices/cart/cartSlice'
import favoriteReducer from './slices/favorite/favoriteSlice';
import otherUserReducer from './slices/otherUser/otherUser';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    chats: chatReducer, 
    user: userReducer,
    otherUser: otherUserReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
  },
});

/* Tipos globales */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;