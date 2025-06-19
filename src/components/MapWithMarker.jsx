import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function MapWithMarker({ position, onMapClick, onLocationResolved }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBWhTiqScPBXqN9p-KsZtb_D5nBfcCPk-A",
  });

  const handleMapClick = async (e) => {
    const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    onMapClick(coords);

    // Reverse geocoding
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=AIzaSyBWhTiqScPBXqN9p-KsZtb_D5nBfcCPk-A`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const address = data.results?.[0]?.formatted_address || "";
      if (address) {
        onLocationResolved(address);
      }
    } catch (err) {
      console.warn("Reverse geocoding failed:", err);
    }
  };

  if (loadError) return <div style={{ color: "red" }}>Eroare la încărcarea hărții.</div>;
  if (!isLoaded) return <div>Se încarcă harta...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={position}
        zoom={14}
        onClick={handleMapClick}
      >
        <Marker position={position} />
      </GoogleMap>
    </div>
  );
}

export default MapWithMarker;
