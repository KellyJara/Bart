import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/axios.ts';
import { AuthResponse, LoginPayload, SignupPayload, AuthState } from '../../types/auth.types.ts';
import { saveToken, removeToken, getToken, saveUserId, getUserId, removeUserId } from './authStorage.ts';

/* ---------- LOGIN ---------- */
export const login = createAsyncThunk<AuthResponse, LoginPayload, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await api.post<AuthResponse>('/auth/signin/', { email, password });

      await saveToken(response.data.token);
      await saveUserId(response.data.userId); // 👈 GUARDAMOS USER ID

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Error al iniciar sesión'
      );
    }
  }
);

/* ---------- SIGNUP ---------- */
export const signup = createAsyncThunk<AuthResponse, SignupPayload, { rejectValue: string }>(
  'auth/signup',
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await api.post<AuthResponse>('/auth/signup/', { username, email, password });
      await saveToken(response.data.token); // <-- guardamos token en AsyncStorage
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error al registrarse');
    }
  }
);

/* ---------- LOAD TOKEN AL INICIAR APP ---------- */
export const loadToken = createAsyncThunk<string | null>(
  'auth/loadToken',
  async () => {
    const token = await getToken();
    return token;
  }
);

/* ---------- LOAD USER ID ---------- */
export const loadUserId = createAsyncThunk<string | null>(
  'auth/loadUserId',
  async () => {
    return await getUserId();
  }
);

/* ---------- INITIAL STATE ---------- */
const initialState: AuthState = {
  token: null,
  roles: [],
  userId: null,
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
      removeToken(); // <-- borrar token en logout
      removeUserId();
    },
  },
  extraReducers: (builder) => {
    builder
      /* LOGIN */
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.roles = action.payload.roles;
        state.userId = action.payload.userId;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'unknown error';
      })
      /* SIGNUP */
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.roles = action.payload.roles;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'unknown error';
      })
      /* LOAD TOKEN */
      .addCase(loadToken.fulfilled, (state, action: PayloadAction<string | null>) => {
        state.token = action.payload;
      })
      /* LOAD USER ID*/
      .addCase(loadUserId.fulfilled, (state, action) => {
        state.userId = action.payload;
});
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
