import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MapComponent from "./Map.jsx";
import GoogleMapComponent from "./Gmap.jsx";
import axios from "axios";

const Popup = ({
  isOpen,
  setIsOpen,
  selectedPlace,
  currentPage,
  handleNext,
  handlePrevious,
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapApi, setMapApi] = useState('GOAPI');

  useEffect(() => {
    setIsLoading(true);
    const apiKey = "939d69c9-d9b4-519a-2b1f-a34bef6c";
    const searchQuery = selectedPlace.name;
    const apiUrl = `https://api.goapi.io/places?search=${encodeURIComponent(searchQuery)}&api_key=${apiKey}`;

    axios
      .get(apiUrl, {
        headers: {
          accept: "application/json",
          "X-API-KEY": apiKey,
        },
      })
      .then((response) => {
        const { lat, lng } = response.data.data.results[0];
        setData({ position: [lat, lng] });
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, [selectedPlace]);

  const totalPage = 3;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="fixed inset-0 transition-opacity"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </motion.div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: 0 }}
          exit={{ y: "100vh" }}
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:w-full h-full"
          style={{ width: "1000px", height: "600px" }}
        >
          <button
            onClick={() => setIsOpen(false)}
            type="button"
            className="absolute top-0 right-0 m-2 inline-flex justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-green-700 hover:text-green-600">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
            </svg>


          </button>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex h-full w-full">
            <div className="w-1/2 h-full overflow-auto">
              <img
                className="w-full h-full object-cover rounded transition duration-300"
                src={selectedPlace.image}
                alt={selectedPlace.name}
              />
            </div>
            <div className="w-1/2 h-full overflow-auto p-4">
              {currentPage === 0 && (
                <div>
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    Description
                  </h2>
                  <p>{selectedPlace.description}</p>
                </div>
              )}
              {currentPage === 1 && (
                <div>
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    Images
                  </h2>
                  <p>{selectedPlace.moreImages}</p>
                </div>
              )}
              {currentPage === 2 &&
                (isLoading ? (
                  <div className="text-black">Loading...</div>
                ) : (
                  <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900">
                      Map
                    </h2>
                    <div className="absolute top-0 right-0 m-4 flex space-x-4">
                      <button
                        className={`px-3 py-2 rounded-md text-sm font-medium focus:outline-none ${mapApi === 'GOAPI' ? 'bg-indigo-500 text-white' : 'text-gray-700 bg-white'}`}
                        onClick={() => setMapApi('GOAPI')}
                      >
                        GOAPI
                      </button>
                      <button
                        className={`px-3 py-2 rounded-md text-sm font-medium focus:outline-none ${mapApi === 'GMAP' ? 'bg-indigo-500 text-white' : 'text-gray-700 bg-white'}`}
                        onClick={() => setMapApi('GMAP')}
                      >
                        GMAP
                      </button>
                    </div>
                    <div className="h-full w-full">
                      {mapApi === 'GOAPI' ? (
                        data && data.position ? (
                          <MapComponent position={data.position} zoom={13} />
                        ) : (
                          <div className="text-black">
                            Mohon maaf, data map tempat ini belum ada.
                          </div>
                        )
                      ) : (
                        isLoading ? (
                          <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
                          </div>
                        ) : (
                          <GoogleMapComponent placeName={selectedPlace.name} />
                        )
                      )}
                    </div>
                  </div>
                ))}

            </div>

            <div className="absolute bottom-0 right-0 m-4">
              {currentPage > 0 && (
                <button
                  onClick={handlePrevious}
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent min-w-16 py-2 bg-green-700 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5 mr-2"
                >
                  Prev
                </button>
              )}
              {currentPage < totalPage - 1 && (
                <button
                  onClick={handleNext}
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent min-w-16 py-2 bg-green-700 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Popup;