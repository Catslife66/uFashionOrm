import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "lib/utils/cartService";

const initialState = {
  cartItems: [],
  totalQty: 0,
  status: "idle",
  error: null,
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (token, { rejectedWithValue }) => {
    try {
      return await cartService.getMyCart(token);
    } catch (err) {
      return rejectedWithValue(err.toString());
    }
  }
);

// export const createOrUpdateCart = createAsyncThunk(
//   "cart/createOrUpdateCart",
//   async ({ data, token }, { rejectedWithValue }) => {
//     try {
//       return await cartService.addtoCart(data, token);
//     } catch (err) {
//       return rejectedWithValue(err.toString());
//     }
//   }
// );

export const updateQty = createAsyncThunk(
  "cart/updateQty",
  async ({ data, token }, { rejectedWithValue }) => {
    try {
      return await cartService.updateItemQty(data, token);
    } catch (err) {
      return rejectedWithValue(err.toString());
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async ({ id, token }, { rejectedWithValue }) => {
    try {
      return await cartService.removeCartItem(id, token);
    } catch (err) {
      return rejectedWithValue(err.toString());
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCartItems.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload.CartItems;
        state.totalQty = state.cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // .addCase(createOrUpdateCart.pending, (state, action) => {
      //   state.status = "loading";
      // })
      // .addCase(createOrUpdateCart.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   const updatedItem = action.payload;
      //   const existingItemIndex = state.cartItems.findIndex(
      //     (item) => item.id === updatedItem.id
      //   );
      //   if (existingItemIndex >= 0) {
      //     state.cartItems[existingItemIndex].quantity += updatedItem.quantity;
      //   } else {
      //     state.cartItems.push(updatedItem);
      //   }
      // })
      // .addCase(createOrUpdateCart.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })

      .addCase(updateQty.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateQty.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.cartItems[index].quantity = action.payload.quantity;
          state.totalQty = state.cartItems.reduce(
            (total, item) => total + item.quantity,
            0
          );
        }
      })
      .addCase(updateQty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(removeItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.totalQty = state.cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
      })
      .addCase(removeItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
