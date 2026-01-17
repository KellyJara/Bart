import api from '../api/axios';
import { Product } from '../types/product.type';

export const productService = {
  getAll: () => api.get<Product[]>('/products'),

  getById: (id: string) =>
    api.get<Product>(`/products/${id}`),

  create: (product: Product) =>
    api.post<Product>('/products', product),

  update: (id: string, product: Product) =>
    api.put<Product>(`/products/${id}`, product),

  remove: (id: string) =>
    api.delete<void>(`/products/${id}`)
};
