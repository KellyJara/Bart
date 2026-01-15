export const selectIsConnected = (state) =>Boolean(state.auth.token);

export const selectToken = (state) => state.auth.token;

export const selectRoles = (state) => state.auth.roles;

export const selectIsAdmin = (state) => state.auth.roles.includes('admin');

export const selectIsModerator = (state) => state.auth.roles.includes('moderator');