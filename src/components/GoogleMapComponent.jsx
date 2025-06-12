import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "10px",
};

const GoogleMapComponent = ({ latitude, longitude }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC5JuiwkvdqmfgLdPnwhXyMCPWyYCaXcCo",
  });

  const center = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  };

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <p>Loading Map...</p>
  );
};

export default GoogleMapComponent;
