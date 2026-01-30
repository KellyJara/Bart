import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { createSlice } from '@reduxjs/toolkit';

interface Role {
  name: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  imgURL: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  profileImg?: string;
  aboutMe?: string;
  roles?: Role[];
}

interface UserState {
  user: User | null;
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  products: [],
  loading: false,
  error: null,
};

interface UpdateUserPayload {
  userId: string;
  data: Partial<Pick<User, 'username' | 'email' | 'profileImg' | 'aboutMe'>>;
}

interface GetUserProfilePayload {
  userId: string;
}

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async ({ userId, data }: UpdateUserPayload, thunkAPI) => {
    try {
      const response = await api.put(`/user/${userId}`, data);
      return response.data.user; // devolver usuario actualizado
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUserProfileThunk = createAsyncThunk(
  'user/getUserProfile',
  async ({ userId }: GetUserProfilePayload, thunkAPI) => {
    try {
      const response = await api.get(`/user/${userId}`); // coincide con tu ruta backend
      return response.data; // { user, products }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSellerProfileThunk = createAsyncThunk(
  'user/getSellerProfile',
  async ({ userId }: GetUserProfilePayload, thunkAPI) => {
    try {
      const response = await api.get(`/user/${userId}`); // coincide con tu ruta backend
      return response.data; // { user, products }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.products = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.products = action.payload.products;
      })
      .addCase(getUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getSellerProfileThunk.pending, (state,action) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getSellerProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.products = action.payload.products;
      })
      .addCase(getSellerProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;