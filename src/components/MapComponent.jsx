import React, { useRef, useLayoutEffect, useState } from 'react'; // 👈 CHANGE 1: Import useLayoutEffect
import maplibregl from 'maplibre-gl';
import "maplibre-gl/dist/maplibre-gl.css";

const MapComponent = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(10.0);
    const [lat] = useState(53.5);
    const [zoom] = useState(2);

    // 👇 NEW STATE: Tracks if the user is in "add marker" mode
    const [mapMode, setMapMode] = useState('view'); // Can be 'view' or 'addMarker'



    // NEW: Define the GeoJSON feature
    const geojson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-74.006, 40.7128] // Example: New York City
                },
                properties: {
                    title: 'New York Point',
                    icon: 'marker',
                    magnitude: 3.5 // Custom property for styling
                }
            }
        ]
    };

    // 👇 NEW FUNCTION: Toggles the map mode
    const handleAddMarkerClick = () => {
        // Toggle between 'view' and 'addMarker'
        setMapMode(mapMode === 'addMarker' ? 'view' : 'addMarker');
    };

    // 🚨 FUNCTION 1: Intercept all map network requests
    const transformRequest = (url, resourceType) => {
        console.log(`📡 Map Request: ${resourceType} -> ${url.substring(0, 100)}...`);
        return { url };
    };

    // 👈 CHANGE 2: Replace useEffect with useLayoutEffect
    useLayoutEffect(() => {
        // Now that the routing is fixed, we can use the simple safety check:
        if (map.current) return;

        // Final check: If the container is still null (shouldn't happen with useLayoutEffect)
        if (!mapContainer.current) {
            console.error("Map container ref is NULL. Cannot initialize map.");
            return;
        }

        try {
            console.log("Map initialization attempt starting...");

            map.current = new maplibregl.Map({
                container: mapContainer.current, // THIS will now be a valid HTMLElement
                style: `https://api.maptiler.com/maps/streets-v2/style.json?key=5Ir3kkPoRd5cLf5LW7Gx`,
                center: [lng, lat],
                zoom: zoom,

                preferCanvas: true, // Keep the canvas fallback
                transformRequest: transformRequest,
                preserveDrawingBuffer: true,
                failIfMajorPerformanceCaveat: false
            });

            // 👇 START OF GEOJSON INTEGRATION 👇
            map.current.on('load', () => {
                // 1. ADD THE SOURCE
                map.current.addSource('points-source', {
                    type: 'geojson',
                    data: geojson // The GeoJSON variable defined above
                });

                // 2. ADD THE LAYER (We'll draw a circle for a Point feature)
                map.current.addLayer({
                    id: 'points-layer',
                    type: 'circle',
                    source: 'points-source', // References the source ID above
                    paint: {
                        // Style the circle based on a property (e.g., 'magnitude')
                        'circle-radius':
                            ['*', ['get', 'magnitude'], 2], // Radius = magnitude * 2
                        'circle-color': '#EE5858', // Red
                        'circle-opacity': 0.8,
                        'circle-stroke-color': '#FFFFFF', // White border
                        'circle-stroke-width': 1
                    }
                });
            });
            // 👆 END OF GEOJSON INTEGRATION 👆

            console.log("✅ Map object successfully created. Dimensions:",
                mapContainer.current.offsetWidth, "x",
                mapContainer.current.offsetHeight
            );

            // 4. Add Navigation Controls (Zoom in/out, Compass)
            map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

            // Add error listeners (omitted here for brevity, but keep them in your file)

        } catch (error) {
            console.error("❌ Map Initialization Failed in Try/Catch:", error);
        }

        // Cleanup: Simple and correct when using the initial safety check
        return () => {
            if (map.current) {
                map.current.remove();
                console.log("Map component cleaned up.");
            }
        };
    }, [lng, lat, zoom]);


    // 👇 NEW useEffect for Event Listeners (Triggers when mapMode changes)
    React.useEffect(() => {
        // Ensure the map object exists before adding listeners
        if (!map.current) return;

        const mapInstance = map.current;

        const handleMapClick = (e) => {
            if (mapMode === 'addMarker') {
                const { lng, lat } = e.lngLat;

                // 1. Create a new MapLibre Marker instance
                const newMarker = new maplibregl.Marker({
                    color: '#FF0000' // Red marker
                })
                    .setLngLat([lng, lat]) // Set the coordinates where the user clicked
                    .addTo(mapInstance);   // Add it to the map

                console.log(`Marker added at Lng: ${lng}, Lat: ${lat}`);

                // 2. OPTIONAL: Reset the mode after adding one marker
                setMapMode('view');
            }
        };

        // Attach the event listener to the map
        mapInstance.on('click', handleMapClick);

        // Cleanup function: This removes the listener when the component unmounts
        // or when the dependencies ([mapMode, mapInstance]) change.
        return () => {
            mapInstance.off('click', handleMapClick);
        };

// The dependencies must include mapMode to ensure the click handler
// gets the latest state value when it runs.
    }, [mapMode]);

    return (
        <div className="map-wrap" style={{
            //flexGrow: 1, // This is the crucial change
            width: '100%',
            height: '100%',
            //minHeight: 0, // A common flexbox trick to allow shrinking
            position: 'relative'
        }}>
            {/* 👇 NEW: Marker Button */}
            <button
                onClick={handleAddMarkerClick}
                style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    color: "black",
                    zIndex: 10, // Ensure it's above the map
                    padding: '8px 15px',
                    backgroundColor: mapMode === 'addMarker' ? 'salmon' : 'lightgreen',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px'
                }}
            >
                {/* Change text based on mode */}
                {mapMode === 'addMarker' ? 'Click Map to Place Marker (Active)' : 'Add a Marker'}
            </button>
            <div
                ref={mapContainer}
                className="map"
                style={{width: '100%', height: '100%'}}
            />
        </div>
    );
};

export default MapComponent;
