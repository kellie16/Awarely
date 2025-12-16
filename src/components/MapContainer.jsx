import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const defaultCenter = {
    lat: 40.7128,
    lng: -74.0060
};

export default function MapContainer({ userLocation, zones, user, onProfileClick }) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return (
            <div className="flex items-center justify-center h-full bg-slate-50 text-slate-500 p-8 text-center">
                <div>
                    <h3 className="text-xl font-bold mb-2">Map Unavailable</h3>
                    <p>Google Maps API Key is missing. Please check your .env configuration.</p>
                </div>
            </div>
        );
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey
    });

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(userLocation || defaultCenter);
        map.fitBounds(bounds);
        map.setZoom(15);
        setMap(map);
    }, [userLocation]);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    if (!isLoaded) {
        return <div className="h-full w-full flex items-center justify-center bg-slate-100">
            <p className="text-slate-500 animate-pulse">Loading Map...</p>
        </div>;
    }

    return (
        <div className="h-full w-full relative">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={userLocation || defaultCenter}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    disableDefaultUI: true,
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    styles: [
                        {
                            featureType: "poi",
                            elementType: "labels",
                            stylers: [{ visibility: "off" }]
                        }
                    ]
                }}
            >
                {userLocation && (
                    <Marker
                        position={userLocation}
                        icon={{
                            path: window.google.maps.SymbolPath.CIRCLE,
                            scale: 8,
                            fillColor: "#3b82f6",
                            fillOpacity: 1,
                            strokeWeight: 2,
                            strokeColor: "#ffffff",
                        }}
                    />
                )}

                {zones && zones.map(zone => (
                    <React.Fragment key={zone.id}>
                        <Circle
                            center={zone.center}
                            radius={zone.radius}
                            options={{
                                fillColor: zone.color,
                                fillOpacity: 0.2,
                                strokeColor: zone.color,
                                strokeOpacity: 0.8,
                                strokeWeight: 1,
                                clickable: false
                            }}
                        />
                    </React.Fragment>
                ))}
            </GoogleMap>

            <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-sm z-10 flex items-center justify-between border border-white/50">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8" />
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-800 leading-tight">Awarely</span>
                        <span className="text-[10px] text-slate-500 font-medium">Safety, When it Matters</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" title="System Active"></div>
                    <button
                        onClick={onProfileClick}
                        className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden hover:ring-2 hover:ring-blue-100 transition-all ml-1"
                    >
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-xs">
                                {user?.displayName ? user.displayName[0].toUpperCase() : 'U'}
                            </div>
                        )}
                    </button>
                </div>
            </div>

            {/* Legend */}
            <div className="absolute top-24 left-4 bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-sm z-10 border border-white/50 text-xs">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-slate-600">Higher Risk</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-slate-600">Mixed Feedback</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-slate-600">Low Concern</span>
                </div>
            </div>
        </div>
    );
}
