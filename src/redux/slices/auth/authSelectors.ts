import { RootState } from '../../store';

//Auth selectors

export const selectIsConnected = (state: RootState) =>Boolean(state.auth.token);

export const selectToken = (state: RootState) => state.auth.token;

export const selectRoles = (state: RootState) => state.auth.roles;

export const selectIsAdmin = (state: RootState) => state.auth.roles.includes('admin');

export const selectIsModerator = (state: RootState) => state.auth.roles.includes('moderator');


//Product selector
export const selectProductOwnerUsernameById =
  (productId: string) =>
  (state: RootState): string | null => {
    const product = state.products.items.find(
      (p) => p._id === productId
    );

    return product?.owner?.username ?? null;
  };
//selector for selected product
 export const selectSelectedProductOwnerUsername = (
  state: RootState
): string | null =>
  state.products.selectedProduct?.owner?.username ?? null;

export const selectMyProducts = (state: RootState) => {
  const userId = state.auth.userId;

  if (!userId) return [];

  return state.products.items.filter(
    (product) => product.owner?._id === userId
  );
};