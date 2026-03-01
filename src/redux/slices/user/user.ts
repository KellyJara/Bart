import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';

/* =======================
   TYPES
======================= */

interface Role {
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  imgURL: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  profileImg?: string;
  aboutMe?: string;
  roles?: Role[];
}

interface UserState {
  currentUser: User | null;   
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  products: [],
  loading: false,
  error: null,
};

/* =======================
   THUNKS
======================= */

// 🔐 Update current user (sale del token)
export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (
    { userId, data }: { userId: string; data: Partial<Pick<User, 'username' | 'email' | 'profileImg' | 'aboutMe'>> },
    thunkAPI
  ) => {
    try {
      const response = await api.put(`/user/${userId}`, data); // <-- aquí va el ID
      return response.data.user; // usuario actualizado
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// 🔐 Get current user profile (token)
export const getUserProfileThunk = createAsyncThunk(
  'user/getUserProfile',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/user/profile');
      return response.data; // { user, products }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =======================
   SLICE
======================= */

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.products = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- UPDATE USER ---------- */
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ---------- CURRENT USER PROFILE ---------- */
      .addCase(getUserProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.products = action.payload.products || [];
      })
      .addCase(getUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;