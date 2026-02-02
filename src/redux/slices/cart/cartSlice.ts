import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './../../store';
import api from '../../api/axios';

// Tipos
interface CartItem {
  product: any;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

// -------------------- THUNKS -------------------- //

// Obtener carrito del usuario
export const fetchCart = createAsyncThunk<CartItem[], void, { state: RootState }>(
  'cart/fetchCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await api.get('/cart'); // Axios ya incluye token desde el interceptor
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching cart');
    }
  }
);

// Agregar producto al carrito
export const addToCart = createAsyncThunk<CartItem[], string, { state: RootState }>(
  'cart/addToCart',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await api.post('/cart', { productId });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error adding to cart');
    }
  }
);

// Quitar producto del carrito
export const removeFromCart = createAsyncThunk<CartItem[], string, { state: RootState }>(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/cart/${productId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error removing from cart');
    }
  }
);

// -------------------- SLICE -------------------- //

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    // fetchCart
    builder.addCase(fetchCart.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // addToCart
    builder.addCase(addToCart.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // removeFromCart
    builder.addCase(removeFromCart.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
