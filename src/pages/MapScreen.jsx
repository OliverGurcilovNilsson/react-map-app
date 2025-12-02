import MapComponent from '../components/MapComponent.jsx'
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CardActions,
    Box
} from '@mui/material';

export default function MapScreen(){
    return (

        // 1. Main container: Set to full viewport height (100vh)
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100vh',
            // 🚨 CHANGE: Remove padding here to prevent the map area from being shifted down
            // We will add padding back just around the Typography
            backgroundColor: 'background.default',
        }}>

            {/* 2. Header: Ensure it's static and visible */}
            <Box sx={{
                padding: '20px', // Apply padding only to the header/text area
                textAlign: 'center',
                backgroundColor: 'background.paper', // Optional: give it a distinct background
                // 🚨 IMPORTANT: Set a Z-index higher than the map button (which is zIndex: 10)
                zIndex: 20,
                position: 'relative' // Create a local stacking context
            }}>
                <Typography
                    variant="h3" // Using h3 for better size control than h1
                    color="text.primary"
                >
                    MapLibre GL
                </Typography>
            </Box>

            {/* 3. Map Component: Takes up the remaining space */}
            <Box sx={{
                flexGrow: 1, // Allows the map to fill the remaining vertical space
                minHeight: 0 // Flexbox hack to allow the child to shrink correctly
            }}>
                <MapComponent key="maplibre-stable-map"/>
            </Box>
        </Box>


       /* <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100vh', // Use viewport height for full screen
                backgroundColor: '#f0f0f0'
            }}>
                <Typography
                    variant="h1"
                    color="text.primary"
                >

                    MapLibre GL



                </Typography>
                {/!* 💥 FIX: Add a unique, static key *!/}
                <MapComponent key="maplibre-stable-map"/>

            </div>
        </>*/
    );
}
