import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "",
    id: "",
    discount: "",
    dataPromo: [],
    // // sizes_id:"",
    // shoppingCart: [],
    // // number: 0,
};

const activePromoSlice = createSlice({
    name: "activePromo",
    initialState,
    reducers: {
        submitPromo: (prevState, action) => {
            console.log(action.payload);

            const exsistIdx = prevState.promo.findIndex(
                (item) =>
                    item.promo_id === action.payload.promo_id &&
                    item.discount === action.payload.discount
            );
            return {
                ...prevState,
                dataPromo : exsistIdx
            }
        }
    }
})

export const activePromoAction = activePromoSlice.actions;
export default activePromoSlice.reducer;