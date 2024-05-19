import React, { useEffect, useState, useRef } from "react";

const GoogleMapComponent = ({ placeName }) => {
  const [isMapLoading, setIsMapLoading] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleOnLoad = () => setIsMapLoading(false);
    const iframe = iframeRef.current;

    if (iframe) {
      iframe.addEventListener("load", handleOnLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleOnLoad);
      }
    };
  }, []);

  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyC_AEfhRfMFqct0KP-HJV3ptrN6WrttOy8&q=${encodeURIComponent(placeName)}`;

  return (
    <div style={{ height: "40vh", width: "100%" }}>
      {isMapLoading && (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-600"></div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        title="Google Map"
        width="100%"
        height="100%"
        frameBorder="0"
        src={googleMapsUrl}
        allowFullScreen
        style={{ display: isMapLoading ? 'none' : 'block' }}
      />
    </div>
  );
};

export default GoogleMapComponent;
