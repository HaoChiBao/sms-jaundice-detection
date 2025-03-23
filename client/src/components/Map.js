import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';  
import 'leaflet/dist/leaflet.css'; 

const Map = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        // replace this with code to fetch our actual jaundice location data
        const fetchedLocations = [
            { lat: 43.7, lon: -79.42, label: 'Camp 1' },
            { lat: 43.73, lon: -79.37, label: 'Camp 2' },
            { lat: 43.75, lon: -79.36, label: 'Camp 3' }
        ];

        setLocations(fetchedLocations);
    }, []);

    return (
        <MapContainer center={[43.7, -79.42]} zoom={12} style={{ height: '50vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location, index) => {
                const locationPin = new L.DivIcon({
                    className: 'custom-icon',
                    html: '<span style="font-size: 32px;">📍</span>',  
                    iconSize: [30, 30],  
                    iconAnchor: [15, 30]  
                });

                return (
                    <Marker
                        key={index}
                        position={[location.lat, location.lon]}
                        icon={locationPin}  
                    >
                        <Popup>{location.label}</Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default Map;