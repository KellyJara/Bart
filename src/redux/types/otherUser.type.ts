import { Product } from './product.type';

export interface Role {
  _id: string;
  name: string;
}

export interface CartItem {
  _id: string;
  quantity: number;
  product: Product;
}

export interface OtherUser {
  _id: string;
  username: string;
  email: string;
  aboutMe?: string;
  profileImg?: string;
  roles: Role[];
  cart: CartItem[];
  favorites: Product[];
  createdAt: string;
  updatedAt: string;
}

export interface OtherUserResponse {
  user: OtherUser;
  products: Product[];
  cart?: CartItem[];
  favorites?: Product[];
}