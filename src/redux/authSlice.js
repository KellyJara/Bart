import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

/* ---------- LOGIN ---------- */
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await api.post('/auth/signin/', {
        email,
        password,
      });
      return response.data; // { token, roles }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Error al iniciar sesión'
      );
    }
  }
);

/* ---------- SIGN UP ---------- */
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await api.post('/auth/signup/', {
        username,
        email,
        password,
      });
      return response.data; // { token, roles }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Error al registrarse'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    roles: [],
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.roles = [];
    },
  },
  extraReducers: (builder) => {
    builder
      /* LOGIN */
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.roles = action.payload.roles;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* SIGNUP */
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.roles = action.payload.roles;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
