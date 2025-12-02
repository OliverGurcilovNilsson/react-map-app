// src/pages/BinanceRealTimeDataScreen.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectBtcPrice,
    selectBtcPreviousPrice,
    selectConnectionStatus
} from '../redux/cryptoSlice'; // Adjust path
import { Box, Typography, Paper, Grid } from '@mui/material';

export default function BinanceRealTimeDataScreen() {
    // 1. Read Data from Redux Store
    const lastPrice = useSelector(selectBtcPrice);
    const previousPrice = useSelector(selectBtcPreviousPrice);
    const status = useSelector(selectConnectionStatus);

    // 2. Logic for Display and Styling
    const priceChange = parseFloat(lastPrice) - parseFloat(previousPrice);
    const isPriceUp = priceChange > 0;
    const isPriceDown = priceChange < 0;

    // MUI colors for price direction
    const priceColor = isPriceUp ? 'success.main' : isPriceDown ? 'error.main' : 'text.primary';
    const indicator = isPriceUp ? '▲' : isPriceDown ? '▼' : '—';

    // Status color
    const statusColor = status === 'CONNECTED' ? 'success.main' : status === 'CONNECTING' ? 'warning.main' : 'error.main';

    return (
        // Main container: full screen height, uses theme's default background
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100%',
                backgroundColor: 'background.default',
                padding: 3
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    textAlign: 'center',
                    width: '90%',
                    maxWidth: 500,
                    backgroundColor: 'background.paper'
                }}
            >
                <Typography
                    variant="h4"
                    color="text.primary"
                    gutterBottom
                >
                    Real-Time BTC/USDT Feed
                </Typography>

                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    {/* Connection Status */}
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Status
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{ color: statusColor, fontWeight: 'bold' }}
                        >
                            {status}
                        </Typography>
                    </Grid>

                    {/* Previous Price */}
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Previous Trade
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            ${previousPrice}
                        </Typography>
                    </Grid>
                </Grid>

                {/* Live Price Display */}
                <Box sx={{ my: 4 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            color: priceColor,
                            fontWeight: 'extrabold',
                            // Add a subtle transition for visual feedback on updates
                            transition: 'color 0.1s ease-in-out'
                        }}
                    >
                        {indicator} ${lastPrice}
                    </Typography>
                </Box>

                <Typography variant="caption" color="text.secondary">
                    Data streamed live from Binance WebSocket API.
                </Typography>
            </Paper>
        </Box>
    );
}
