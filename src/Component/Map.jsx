// Map.jsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import markerIcon from '../img/Map-Pin.png';

const MapComponent = ({ position, zoom }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!position || position.length !== 2) {
      console.error('Invalid position:', position);
      return;
    }

    mapRef.current = L.map('map', {
      center: position,
      zoom: zoom,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ],
    });

    const customIcon = L.icon({
      iconUrl: markerIcon,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [-3, -76],
    });

    markerRef.current = L.marker(position, { icon: customIcon }).addTo(mapRef.current);

    return () => {
      mapRef.current.remove();
    };
  }, [position, zoom]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(position);
    }
  }, [position]);

  return <div id="map" className="h-1/4 w-1/4 mx-auto my-4 shadow-lg rounded-lg overflow-hidden" />;
};

export default MapComponent;
