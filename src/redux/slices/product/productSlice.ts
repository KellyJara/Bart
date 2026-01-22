import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, CreateProductPayload, updateProductPayload } from '../../types/product.type';
import { productService } from '../../services/productService';
import api from '../../api/axios';

interface ProductState {
  items: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null
};

// THUNKS
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchAll',
  async () => {
    const res = await productService.getAll();
    return res.data;
  }
);

export const fetchProductById = createAsyncThunk<Product, string>(
  'products/fetchById',
  async (id) => {
    const res = await productService.getById(id);
    return res.data;
  }
);

export const createProduct = createAsyncThunk<
  Product,
  CreateProductPayload
>(
  'products/create',
  async (payload) => {
    const res = await productService.create(payload);
    return res.data;
  }
);


export const updateProduct = createAsyncThunk<
  Product,
  { id: string; product: updateProductPayload }
>(
  'products/update',
  async ({ id, product }) => {
    const res = await productService.update(id, product);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk<string, string>(
  'products/delete',
  async (id) => {
    await productService.remove(id);
    return id;
  }
);

// SLICE
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error';
      })

      // FETCH BY ID
      .addCase(fetchProductById.pending, (state) => {
       state.loading = true;
       state.selectedProduct = null;
       })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })

      .addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Error al cargar producto';
      })

      // CREATE
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // UPDATE
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (p) => p._id !== action.payload
        );
      });
  }
});

export default productSlice.reducer;
