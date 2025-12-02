import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    btcPrice: '0.00',
    // We'll track the last known price to determine if the price is going up or down.
    btcPreviousPrice: '0.00',
    status: 'DISCONNECTED', // For connection status: DISCONNECTED, CONNECTING, CONNECTED
};

export const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        // Action to update the price and manage the previous price
        setBtcPrice: (state, action) => {
            const newPrice = action.payload;

            // Set the current price as the previous price before updating the current
            state.btcPreviousPrice = state.btcPrice;
            state.btcPrice = newPrice;
        },
        // Action to update the connection status
        setConnectionStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { setBtcPrice, setConnectionStatus } = cryptoSlice.actions;

// Selector functions to easily retrieve data from any component
export const selectBtcPrice = (state) => state.crypto.btcPrice;
export const selectBtcPreviousPrice = (state) => state.crypto.btcPreviousPrice;
export const selectConnectionStatus = (state) => state.crypto.status;

export default cryptoSlice.reducer;
