import React from "react";
import AppButton from "./AppButton";

const LocationList = ({ locations, onViewLocation, onDeleteLocation }) => {
    return (
      <div className="list-container">
        {locations.length > 0 ? (
          <div>
            <p className="list-heading">List of Selected Locations</p>
            {locations.map((loc) => (
              <div key={loc.location.lat + loc.location.lng} className="list-item">
                <p className="latLng-text">{loc.name}</p>
                <div style={{ display: "flex" }}>
                  <AppButton handleClick={() => onViewLocation(loc.location)}>
                    View
                  </AppButton>
                  <AppButton handleClick={() => onDeleteLocation(loc.location)}>
                    Delete
                  </AppButton>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="list-heading">Select a location from the map to show in a list</p>
          </div>
        )}
      </div>
    );
  };

export default LocationList;
