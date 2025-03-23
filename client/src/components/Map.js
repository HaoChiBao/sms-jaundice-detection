import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const [locations, setLocations] = useState([]);

  const fetchCoordinates = async (location) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), label: location };
      }
      return null;
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  };

  useEffect(() => {
    const locationNames = [
      'Toronto, Ontario, Canada',
      'Vancouver, British Columbia, Canada',
      'Montreal, Quebec, Canada',
      'Calgary, Alberta, Canada'
    ];

    const fetchAllLocations = async () => {
      const fetchedLocations = await Promise.all(locationNames.map(fetchCoordinates));
      const validLocations = fetchedLocations.filter(loc => loc !== null);
      setLocations(validLocations);
    };

    fetchAllLocations();
  }, []);

  return (
    <MapContainer center={[43.7, -79.42]} zoom={4} style={{ height: '50vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => {
        const locationPin = new L.DivIcon({
          className: 'custom-icon',
          html: '<span style="font-size: 32px;">📍</span>',
          iconSize: [30, 30],
          iconAnchor: [15, 30],
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
