import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Import the reducer we created
import cryptoReducer from "./cryptoSlice.js";

export const store = configureStore({
    // The reducer object defines the structure of your global state.
    // State will look like: { cart: { items: [], total: 0 } }
    reducer: {
        cart: cartReducer, // Key 'cart' maps to cartReducer logic
        // Add other slice reducers here later (e.g., user: userReducer)
        crypto: cryptoReducer,
    },
});


