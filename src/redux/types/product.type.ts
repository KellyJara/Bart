export interface Product {
 _id: string;
  name: string;
  category: string;
  price: number; 
  imgURL: string; 
  description: string;
  stock: number;
  isActive: boolean;
  inCart: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface getProductsPayload {
  name: string;
  category: string;
  price: number;
  imgURL: string;
  description: string;
  stock?: number;
  isActive?: boolean;
  inCart?: boolean;
}

export interface getProductByIdPayload {
  //username: string;
  //email: string;
  //password: string;
}

export interface CreateProductPayload {
  name: string;
  category: string;
  price: number;
  imgURL: string;
  description: string;
  stock?: number;
  isActive?: boolean;
  inCart?: boolean;
}

export interface updateProductPayload {
  name?: string;
  category?: string;
  price?: number;
  imgURL?: string;
  description?: string;
  stock?: number;
  isActive?: boolean;
  inCart?: boolean;
}


export interface ProductState {
 items: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}
