import { useState, useEffect } from 'react';

function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d * 1000; // Distance in meters
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

export function useGeofence(userLocation, zones) {
    const [currentZone, setCurrentZone] = useState(null);

    useEffect(() => {
        if (!userLocation || !zones) return;

        const matchedZone = zones.find(zone => {
            const distance = getDistanceFromLatLonInMeters(
                userLocation.lat,
                userLocation.lng,
                zone.center.lat,
                zone.center.lng
            );
            return distance <= zone.radius;
        });

        setCurrentZone(matchedZone || null);
    }, [userLocation, zones]);

    return currentZone;
}
