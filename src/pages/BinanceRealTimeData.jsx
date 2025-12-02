// src/pages/BinanceRealTimeData.jsx

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBtcPrice, setConnectionStatus } from '../redux/cryptoSlice.js'; // Adjust path as needed
import { Box, Typography } from '@mui/material';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws/btcusdt@trade';

export default function BinanceRealTimeData({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('🔄 useEffect running: Attempting to connect to WS...');
        dispatch(setConnectionStatus('CONNECTING'));
        const socket = new WebSocket(BINANCE_WS_URL);

        socket.onopen = () => {
            console.log('✅ WS OPEN: Connection successful.');
            dispatch(setConnectionStatus('CONNECTED'));
        };

        socket.onmessage = (event) => {
            // Log the raw message once to see if data is actually arriving
            // ONLY log the first few for high-frequency streams
            if (Date.now() % 5000 < 50) { // Log roughly every 5 seconds
                console.log('⬅️ WS MESSAGE RECEIVED (sample):', event.data.substring(0, 50) + '...');
            }

            try {
                const data = JSON.parse(event.data);
                const price = parseFloat(data.p).toFixed(2);
                dispatch(setBtcPrice(price));

            } catch (error) {
                // If the first JSON.parse fails, it might be a server PONG or status message.
                // We will log the message if it's not JSON
                console.warn('⚠️ WS MESSAGE PARSE ERROR (Non-JSON or unknown message type):', event.data);
            }
        };

        socket.onclose = (event) => {
            console.log('🛑 WS CLOSED. Code:', event.code, 'Reason:', event.reason || 'No reason provided');
            // Check if the close was initiated by React Strict Mode (often code 1000)
            if (event.code === 1000 && !event.reason) {
                console.warn('🚨 Likely Strict Mode Closure or clean server shutdown.');
            }
            dispatch(setConnectionStatus('DISCONNECTED'));
        };

        socket.onerror = (error) => {
            console.error('❌ WS ERROR:', error);
            dispatch(setConnectionStatus('ERROR'));
        };

        // Cleanup: Close the connection when the component unmounts
        return () => {
            console.log('🧹 CLEANUP FUNCTION: Running now.');
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close(1000, 'Component Unmounting Cleanup');
            } else {
                console.log(`🧹 CLEANUP: Socket was not open (Ready State: ${socket?.readyState}).`);
            }
        };

    }, [dispatch]);

    // This component renders its children, acting as a container/provider for the data
    return <>{children}</>;
}
