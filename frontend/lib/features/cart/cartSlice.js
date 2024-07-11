import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalQty: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action) {
      state.totalQty += action.payload;
    },
    removeItems(state, action) {
      state.totalQty -= action.payload;
    },
  },
});

export const { addItems, removeItems } = cartSlice.actions;
export default cartSlice.reducer;
