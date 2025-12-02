import { createSlice } from '@reduxjs/toolkit';

// 1. Initial State: This is what your cart state looks like initially.
const initialState = {
    items: [],
    total: 0,
};


export const cartSlice = createSlice({
    name:"cart",
    initialState,

    reducers: {
        //define the Reducer logic (Action handlers)

        addItem: (state, action) => {
            const itemToAdd = action.payload; //the item object passed when dispatching

            //use Immer (built-in to createSlice) so we can "mutate" the state directly
            //under the hood, immer creates a new immutable state for us

            state.items.push(itemToAdd);
            state.total += itemToAdd.price;

        },

        removeItem: (state, action) => {
            const itemToRemove = action.payload;

            const itemIndex = state.items.findIndex(item => item.id === itemToRemove.id);

            if (itemIndex > -1) {
                state.total -= state.items[itemIndex].price;
                //remove the item at that index
                state.items.splice(itemIndex, 1);
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        }
    },
});


//Export the actions and reducer

export const {addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
