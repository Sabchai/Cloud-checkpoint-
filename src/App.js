import React, { useState } from "react";
import CustomMap from "./components/CustomMap";
import LocationList from "./components/LocationList";
import { APIProvider } from "@vis.gl/react-google-maps";
import "./App.css";
import AppButton from "./components/AppButton";

const App = () => {
  const [listOfLocations, setListOfLocations] = useState([]);
  const [markerLocation, setMarkerLocation] = useState({ lat: 51.509865, lng: -0.118092 });

  const onAddLocation = (location) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === "OK" && results[0]) {
        setListOfLocations((prev) => [
          ...prev,
          { name: results[0].formatted_address, location },
        ]);
      }
    });
  };

  const onViewLocation = (loc) => {
    setMarkerLocation({ lat: loc.lat, lng: loc.lng });
  };

  const onDeleteLocation = (loc) => {
    setListOfLocations((prev) => 
      prev.filter((l) => loc.lat !== l.location.lat && loc.lng !== l.location.lng)
    );
  };

  const exportLocations = () => {
    const data = JSON.stringify(listOfLocations);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "locations.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const importLocations = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const importedData = JSON.parse(e.target.result);
      setListOfLocations((prev) => [...prev, ...importedData]);
    };
    reader.readAsText(file);
  };

  return (
    <div className="app">
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <CustomMap 
          onAddLocation={onAddLocation} 
          markerLocation={markerLocation} 
        />
        <LocationList 
          locations={listOfLocations} 
          onViewLocation={onViewLocation} 
          onDeleteLocation={onDeleteLocation} 
        />
      </APIProvider>
      <div className="list-footer">
        <AppButton handleClick={exportLocations}>Export Locations</AppButton>
        <input
          className="app-button"
          type="file"
          accept=".json"
          onChange={importLocations}
        />
      </div>
    </div>
  );
};

export default App;
