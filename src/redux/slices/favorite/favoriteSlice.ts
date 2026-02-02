import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import api from '../../api/axios';

// -------------------- THUNKS -------------------- //

// Obtener favoritos del usuario
export const fetchFavorites = createAsyncThunk<any[], void, { state: RootState }>(
  'favorites/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/favorite'); // Axios ya envía el token desde el interceptor
      return res.data; // Array de favoritos (ids de productos)
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching favorites');
    }
  }
);

// Toggle favorito (like/unlike)
export const toggleFavorite = createAsyncThunk<any[], string, { state: RootState }>(
  'favorites/toggleFavorite',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await api.post('/favorite', { productId });
      return res.data; // Array actualizado de favoritos
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error toggling favorite');
    }
  }
);

// -------------------- SLICE -------------------- //

interface FavoritesState {
  items: string[]; // Lista de productIds
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchFavorites
    builder.addCase(fetchFavorites.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchFavorites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Error fetching favorites';
    });

    // toggleFavorite
    builder.addCase(toggleFavorite.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(toggleFavorite.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.items = action.payload; // Reemplaza la lista con los favoritos actualizados
    });
    builder.addCase(toggleFavorite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Error toggling favorite';
    });
  },
});

export default favoritesSlice.reducer;
