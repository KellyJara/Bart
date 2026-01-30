import {Chat} from '../slices/chat/chatSlice';

export type RootStackParamList = {
  Login: undefined;
  Message: undefined;
  Chat: { chat: Chat };
  Products: undefined;
  Signup: undefined;
  RegisterProduct: undefined;
  ProductDetail: { productId: string };
  EditProductScreen: undefined;
  EditProfile:undefined;
  SellerProfile: {sellerId: string};
};