import React from "react";

const GoogleMapComponent = ({ placeName }) => {

  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyC_AEfhRfMFqct0KP-HJV3ptrN6WrttOy8&q=${encodeURIComponent(placeName)}`;
  console.log(placeName)
  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        frameBorder="0"
        src={googleMapsUrl}
        allowFullScreen
      />
    </div>
  );
};

export default GoogleMapComponent;
