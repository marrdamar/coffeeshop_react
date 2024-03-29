import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveries_id: "",
  notes: "",
  // sizes_id:"",
  shoppingCart: [],
  // number: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // increment: (prevState) => {
    //   return {
    //     ...prevState,
    //     number: prevState.number + 1,
    //   };
    // },
    // decrement: (prevState) => {
    //   return {
    //     ...prevState,
    //     number: prevState.number - 1,
    //   };
    // },
    deliveryMethod: (prevState, action) => {
      return { ...prevState, deliveries_id: action.payload };
    },
    sizes: (prevState, action) => {
      return { ...prevState, sizes_id: action.payload };
    },
    notes: (prevState, action) => {
      return { ...prevState, notes: action.payload };
    },
    addtoCart: (prevState, action) => {
      console.log(action.payload);

      const exsistIdx = prevState.shoppingCart.findIndex(
        (item) =>
          item.product_id === action.payload.product_id &&
          item.sizes_id === action.payload.sizes_id
      );

      if (exsistIdx !== -1) {
        // Jika objek dg nilai id yg sama sudah ada di dalam array,
        // tambahkan nilai qty pada objek tersebut
        const existItem = prevState.shoppingCart[exsistIdx];
        const updatedItem = {
          ...existItem,
          qty: existItem.qty + action.payload.qty,
          subtotal: existItem.subtotal + action.payload.subtotal,
          sizes_id: existItem.sizes_id + action.payload.sizes_id,
        };
        const updatedCart = [
          ...prevState.shoppingCart.slice(0, exsistIdx),
          updatedItem,
          ...prevState.shoppingCart.slice(exsistIdx + 1),
        ];
        return {
          ...prevState,
          shoppingCart: updatedCart,
        };
      } else {
        // Jika objek dg nilai id yg sama belum ada di dalam array,
        // tambahkan objek baru ke dalam array
        const updatedCart = [...prevState.shoppingCart, action.payload];
        return {
          ...prevState,
          shoppingCart: updatedCart,
        };
      }

      // return {
      //   ...prevState,
      //   shoppingCart: prevState.shoppingCart.concat(action.payload),
      // };
    },
    resetCounter: () => {
      return initialState;
    },
  },
});

export const counterAction = counterSlice.actions;
export default counterSlice.reducer;
