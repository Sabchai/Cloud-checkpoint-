import React, { useState } from "react";
import { Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";
import "../App.css";

const CustomMap = ({ onAddLocation, markerLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [dialogLocation, setDialogLocation] = useState("");

  const handleMapClick = (mapProps) => {
    if (mapProps.detail.placeId) {
      const lat = mapProps.detail.latLng.lat();
      const lng = mapProps.detail.latLng.lng();
      setSelectedLocation({ lat, lng });
      setDialogLocation({ lat, lng });
      setShowDialog(true);
    } else {
      alert("Please select a specific location");
    }
  };

  return (
    <div className="map-container">
      <Map
        style={{ borderRadius: "20px" }}
        defaultZoom={13}
        defaultCenter={markerLocation}
        gestureHandling={"greedy"}
        disableDefaultUI
        onClick={handleMapClick}
      >
        <Marker position={markerLocation} />
        {showDialog && (
          <InfoWindow position={dialogLocation}>
            <button onClick={() => {
              onAddLocation(selectedLocation); // Add the location
              setShowDialog(false); // Close dialog
            }}>
              Add this location
            </button>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
};

export default CustomMap;
