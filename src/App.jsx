import {EffectExample} from "./hooks/use-effect/index";
import {ContextExample} from "./hooks/use-context";
import {ReducerExample} from "./hooks/useReducer/index.jsx";
import {RefExample} from "./hooks/use-ref/index.jsx";
import {HomeComponent} from "./page.jsx"
import {DisemVowel} from "./codeWars.jsx"
import {MapFunctions} from "./map/index.jsx";
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import MapScreen from './pages/MapScreen.jsx';
import {AppBar, Toolbar, Typography, Button, Box, IconButton} from '@mui/material';
import {store} from "./redux/store.js"
import {Provider} from "react-redux";
import { ThemeContextProvider } from './ThemeContext.jsx';
import {NavBar} from "./components/NavBar.jsx"
import { CssBaseline } from '@mui/material';
import BinanceRealTimeData from './pages/BinanceRealTimeData.jsx'; // The provider/container
import BinanceRealTimeDataScreen from './pages/BinanceRealTimeDataScreen.jsx'
import {CssGridsExample} from "./pages/CssGridsExample.jsx";
import {FlexGrowExample} from "./pages/FlexGrow.jsx";
import Brightness4Icon from '@mui/icons-material/Brightness4'; // For the Moon/Dark Mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7';


import 'maplibre-gl/dist/maplibre-gl.css';


function App() {
    return (
        <ThemeContextProvider>
            <Provider store={store}>
                <Router>
                    {/* 1. Use the new NavBar component */}
                    <CssBaseline />
                    <NavBar />

                    {/* 2. Routes go BELOW the NavBar (which contains the spacer) */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/homecomponent" element={<HomeComponent />} />
                        <Route path="/map" element={<MapScreen />} />
                        <Route path="/grids" element={<CssGridsExample/>} />
                        <Route path="/flexgrow" element={<FlexGrowExample/>} />
                        {/* 2. 🚨 FIX: Wrap the Binance screen with the data provider */}
                        <Route
                            path="/binance"
                            element={
                                <BinanceRealTimeData>
                                    <BinanceRealTimeDataScreen />
                                </BinanceRealTimeData>
                            }
                        />
                    </Routes>
                </Router>
            </Provider>
        </ThemeContextProvider>
    );
}

export default App;
