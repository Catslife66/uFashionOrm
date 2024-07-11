import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "lib/utils/productService";

const initialState = {
  product: {},
  status: "idle",
  error: null,
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (slug, { rejectWithValue }) => {
    try {
      return await productService.getSingleProduct(slug);
    } catch (err) {
      return rejectWithValue(err.toString());
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      });
  },
});

export default productSlice.reducer;
