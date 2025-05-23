import React, { useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

function Map({ markers = [], selectedPet, onMarkerClick }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBWhTiqScPBXqN9p-KsZtb_D5nBfcCPk-A",
  });

  const mapRef = useRef(null);

  useEffect(() => {
    if (selectedPet?.position && mapRef.current) {
      mapRef.current.panTo(selectedPet.position);
    }
  }, [selectedPet]);
  

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      center={selectedPet?.position || { lat: 44.4268, lng: 26.1025 }}
      zoom={11}
      onLoad={(map) => (mapRef.current = map)}
    >
      {markers.map((pet, idx) => (
        <Marker
          key={idx}
          position={pet.position}
          onClick={() => onMarkerClick?.(pet)}
        />
      ))}

      {selectedPet && (
        <InfoWindow
          position={selectedPet.position}
          onCloseClick={() => onMarkerClick(null)}
        >
          <div style={{ maxWidth: "200px" }}>
            <h4>{selectedPet.name}</h4>
            <p>{selectedPet.type} - {selectedPet.animalStatus}</p>
            {selectedPet.imageUrl && (
              <img src={selectedPet.imageUrl} alt={selectedPet.name} style={{ width: "100%" }} />
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default Map;
