import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import productService from "./products.Service";
import cartService from './cart.Service';



interface ProductListState {
  products: Product[];
  cart: CartItem[];
  error: string | null;
  loading: boolean;
}

const initialState: ProductListState = {
  products: [],
  cart: [],
  error: null,
  loading: false,
};

export const getCart = createAsyncThunk(
  'product-list/getCart',
  async (_, thunkAPI) => {
    try {
      return await cartService.getCart();
    } catch (err) {
      return thunkAPI.rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

export const addToCart = createAsyncThunk(
  'product-list/addToCart',
  async (cartItem: any, thunkAPI) => {
    try {
      // You can add custom logic here if needed
      return await cartService.addToCart(cartItem);
    } catch (err) {
      return thunkAPI.rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

export const modifyCartItemQuantity = createAsyncThunk(
  'product-list/modifyCartItemQuantity',
  async (cartItem: any, thunkAPI) => {
    try {
      // You can add custom logic here if needed
      return await cartService.updateCartItem(cartItem);
    } catch (err) {
      return thunkAPI.rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'product-list/removeFromCart',
  async (productId: string, thunkAPI) => {
    try {
      // You can add custom logic here if needed
      return await cartService.removeFromCart(productId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

export const clearCart = createAsyncThunk(
  'product-list/clearCart',
  async (_, thunkAPI) => {
    try {
      // You can add custom logic here if needed
      return await cartService.clearCart();
    } catch (err) {
      return thunkAPI.rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

export const addProduct = createAsyncThunk(
  'product-list/add',
  async (productData: any, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

export const getProducts = createAsyncThunk(
  'product-list/getAll',
  async (_, thunkAPI) => {
    try {
      return await productService.getAllAsync('products');
    } catch (err) {
      return thunkAPI.rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product-list/delete',
  async (productId: string, thunkAPI) => {
    try {
      await productService.deleteProduct(productId);
      return productId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product-list/update',
  async (productData: any, thunkAPI) => {
    try {
      await productService.updateProduct(productData);
      return productData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

const productListSlice = createSlice({
  name: 'Product-list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = [...state.products, action.payload] as Product[];
      })
      
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload;
      })
      
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart.push(action.payload);
      })
      .addCase(modifyCartItemQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(modifyCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart = state.cart.map((cartItem) =>
          cartItem.cartItemId === action.payload.cartItemId ? action.payload : cartItem
        );
      })
      .addCase(modifyCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.cart = state.cart.filter((cartItem) => cartItem.cartItemId !== action.payload);
    })

      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.cart = [];
      });
  },
});

export default productListSlice.reducer;
