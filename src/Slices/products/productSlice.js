import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    isToast: false,
  },
  reducers: {
    addProducts: (state, actions) => {
      const isExist = state.items.find(
        (item) => item.id === actions.payload.id
      );
      if (isExist) {
        state.isToast = true;
      } else {
        const stateMan = state.items.push({ ...actions.payload, quantity: 1 });
        console.log(stateMan, "stateMan");
      }
    },
    increaseQuantity: (state, actions) => {
      const product = state.items.find(
        (item) => item.id === actions.payload.id
      );
      if (product) {
        product.quantity += 1;
      }
      console.log(product, "productm");
    },
    decreaseQuantity: (state, actions) => {
      const product = state.items.find(
        (item) => item.id === actions.payload.id
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }else{
      state.items = state.items.filter(
        (item) => item.id !== actions.payload.id
      );}
    },
  },
});

export const { addProducts, increaseQuantity, decreaseQuantity } =
  productSlice.actions;

export default productSlice.reducer;
