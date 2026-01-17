import { RootState } from '../store';

export const selectIsConnected = (state: RootState) =>Boolean(state.auth.token);

export const selectToken = (state: RootState) => state.auth.token;

export const selectRoles = (state: RootState) => state.auth.roles;

export const selectIsAdmin = (state: RootState) => state.auth.roles.includes('admin');

export const selectIsModerator = (state: RootState) => state.auth.roles.includes('moderator');