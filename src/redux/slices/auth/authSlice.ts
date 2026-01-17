import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/axios.ts';
import {
  AuthResponse,
  LoginPayload,
  SignupPayload,
  AuthState,
} from '../../types/auth.types.ts';

/* ---------- LOGIN ---------- */
export const login = createAsyncThunk<
  AuthResponse,          // lo que devuelve
  LoginPayload,          // lo que recibe
  { rejectValue: string }
 >(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await api.post<AuthResponse>('/auth/signin/', {
        email,
        password,
      });
      return response.data; // { token, roles }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Error al iniciar sesión'
      );
    }
  }
);

/* ---------- SIGN UP ---------- */
export const signup = createAsyncThunk<
  AuthResponse,
  SignupPayload,
  { rejectValue: string }
>(
  'auth/signup',
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await api.post<AuthResponse>('/auth/signup/', {
        username,
        email,
        password,
      });
      return response.data; // { token, roles }
    } catch (error:any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Error al registrarse'
      );
    }
  }
);

/* ---------- INITIAL STATE ---------- */
const initialState: AuthState = {
  token: null,
  roles: [],
  loading: false,
  error: null,
};
/* ---------- SLICE ---------- */
const authSlice = createSlice({
  name: 'auth',
  initialState,
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
      .addCase(
        login.fulfilled, 
        (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.roles = action.payload.roles;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload??'unknown error';
      })

      /* SIGNUP */
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action:PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.roles = action.payload.roles;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload??'unknown error';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
