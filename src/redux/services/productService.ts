import api from '../api/axios';
import { Product,CreateProductPayload, updateProductPayload } from '../types/product.type';

export const productService = {
  getAll: () => api.get<Product[]>('/products'),

  getById: (id: string) =>
    api.get<Product>(`/products/${id}`),

  create: (product: CreateProductPayload) =>
    api.post<Product>('/products', product),

  update: (id: string, product: updateProductPayload) =>
    api.put<Product>(`/products/${id}`, product),

  remove: (id: string) =>
    api.delete<void>(`/products/${id}`)
};
