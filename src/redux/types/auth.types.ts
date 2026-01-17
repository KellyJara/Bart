export interface AuthResponse {
  token: string;
  roles: string[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  roles: string[];
  loading: boolean;
  error: string | null;
}
