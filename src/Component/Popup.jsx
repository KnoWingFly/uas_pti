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
  const [mapApi, setMapApi] = useState("GOAPI");
  const [description, setDescription] = useState("");
  const [review1, setReview1] = useState("");
  const [review2, setReview2] = useState("");
  const [review3, setReview3] = useState("");

  useEffect(() => {
    setIsLoading(true);
    if (selectedPlace) {
      const apiKey = "939d69c9-d9b4-519a-2b1f-a34bef6c";
      const searchQuery = selectedPlace.name;
      const apiUrl = `https://api.goapi.io/places?search=${encodeURIComponent(
        searchQuery,
      )}&api_key=${apiKey}`;

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

      setDescription(selectedPlace.description);
      setReview1(selectedPlace.review1.review);
      setReview2(selectedPlace.review2.review);
      setReview3(selectedPlace.review3.review);
    }
  }, [selectedPlace]);

  const totalPage = 3;

  return isOpen && selectedPlace ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 mx-5">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="fixed inset-0 transition-opacity"
        >
          <div className="absolute overlay inset-0 bg-gray-500 opacity-75 z-70"></div>

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
            className="absolute z-50 top-0 right-0 m-2 inline-flex justify-center rounded-full border border-transparent px-1 py-1 bg-green-700 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>

          </button>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col md:flex-row h-full w-full">
            <div className="w-full md:w-1/2 h-full overflow-auto border-solid border-4 border-green-700 rounded-xl hover:border-green-600 relative">
              <img
                className="w-full h-full object-cover rounded transition duration-300"
                src={selectedPlace.imageData}
                alt={selectedPlace.name}
              />

              <div className="absolute bottom-0 left-0 ms-1 mb-1 xs:text-md sm:text-lg md:text-2xl mb-2 font-semibold text-gray-900 text-white bg-black rounded-full px-3">
                <h1>{selectedPlace.rating} ⭐</h1>
              </div>

            </div>

            <div className="w-full md:w-1/2 h-full overflow-auto p-4">
              {currentPage === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 bg-white overflow-hidden rounded-lg shadow-lg flex flex-col items-center justify-center"
                >

                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Description
                  </h2>

                  {/* <h1 className="absolute bottom-0 left-0 mb-5 ms-10 text-2xl font-semibold text-gray-900 text-white">{selectedPlace.rating} ⭐</h1> */}

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-lg text-gray-800"
                  >
                    {description}
                  </motion.p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-4 flex items-center space-x-2"
                  >
                    <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="w-6 h-6 rounded-full bg-red-500"
                    ></motion.div>
                    <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="w-6 h-6 rounded-full bg-orange-500"
                    ></motion.div>
                    <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="w-6 h-6 rounded-full bg-yellow-500"
                    ></motion.div>
                    <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.5 }}
                      className="w-6 h-6 rounded-full bg-green-500"
                    ></motion.div>
                    <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.6, duration: 0.5 }}
                      className="w-6 h-6 rounded-full bg-blue-500"
                    ></motion.div>
                    <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.8, duration: 0.5 }}
                      className="w-6 h-6 rounded-full bg-indigo-500"
                    ></motion.div>
                    <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 2, duration: 0.5 }}
                      className="w-6 h-6 rounded-full bg-purple-500"
                    ></motion.div>
                  </motion.div>
                </motion.div>
              )}

              {currentPage === 1 && (
                <div>

                  <motion.h2 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="leading-6 font-medium text-gray-900 text-2xl font-semibold text-gray-900 mb-4 justify-center flex">
                    Reviews
                  </motion.h2>

                  <div className="p-4 bg-white rounded-lg flex flex-col items-center gap-5">

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className="text-start shadow-lg p-5 rounded-lg h-full w-full relative pb-10">

                      <div className="absolute bottom-0 right-0 text-xs mb-2 font-semibold text-black px-3">
                          {selectedPlace.review1.rating} ⭐
                      </div>

                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-lg text-gray-800">
                        
                        {review1}

                      </motion.p>

                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className="text-start shadow-lg p-5 rounded-lg h-full w-full relative pb-10">

                      <div className="absolute bottom-0 right-0 text-xs mb-2 font-semibold text-black px-3">
                          {selectedPlace.review2.rating} ⭐
                      </div>

                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-lg text-gray-800">
                        
                        {review2}

                      </motion.p>

                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className="text-start shadow-lg p-5 rounded-lg h-full w-full relative pb-10">

                      <div className="absolute bottom-0 right-0 text-xs mb-2 font-semibold text-black px-3">
                          {selectedPlace.review3.rating} ⭐
                      </div>

                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-lg text-gray-800">
                        
                        {review3}

                      </motion.p>

                    </motion.div>

                  </div>

                </div>
              )}

              {currentPage === 2 && (
                <>
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    Map
                  </h2>

                  {/* <h1 className="absolute bottom-0 left-0 mb-5 ms-10 text-2xl font-semibold text-gray-900 text-white">{selectedPlace.rating} ⭐</h1> */}

                  <div className="relative top-0 z-50 right-0 m-4 ms-0 flex space-x-4 justify-start">
                    <button
                      className={`px-3 py-2 rounded-md text-sm font-medium focus:outline-none ${mapApi === "GMAP"
                      ? "bg-green-700 text-white hover:bg-green-600 hover:text-white"
                      : "text-gray-700 bg-white hover:bg-green-600 hover:text-white"
                        }`}
                      onClick={() => setMapApi("GMAP")}
                    >
                      GMAP
                    </button>

                    <button
                      className={`px-3 py-2 rounded-md text-sm font-medium focus:outline-none ${mapApi === "GOAPI"
                        ? "bg-green-700 text-white border border-gray-200 hover:bg-green-600 hover:text-white"
                        : "text-gray-700 bg-white border border-gray-200 hover:bg-green-600 hover:text-white"
                        }`}
                      onClick={() => setMapApi("GOAPI")}
                    >
                      GOAPI
                    </button>
                  </div>

                  <div className="h-3/4 w-full overflow-auto">
                    {mapApi === "GOAPI" ? (
                      data && data.position ? (
                        <div className="object-cover">
                          <MapComponent position={data.position} zoom={13} />
                        </div>
                      ) : (
                        <div className="text-black">
                          Mohon maaf, data map tempat ini belum ada.
                        </div>
                      )
                    ) : isLoading ? (
                      <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
                      </div>
                    ) : (
                      <div className="object-contain">
                        <GoogleMapComponent placeName={selectedPlace.name} />
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="flex md:m-4 justify-between absolute bottom-0 right-0 w-full md:w-2/4 p-6 pb-3 md:p-0 md:pb-0 md:ps-6 z-60">
                <div>
                  {currentPage > 0 && (
                    <button
                      onClick={handlePrevious}
                      type="button"
                      className="z-50 inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-green-700 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:border-green-600 focus:shadow-outline"
                    >
                      Prev
                    </button>
                  )}
                </div>

                <div>
                  {currentPage < totalPage - 1 && (
                    <button
                      onClick={handleNext}
                      type="button"
                      className="z-50 ml-4 inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-green-700 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:border-green-600 focus:shadow-outline"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* <div className="absolute bottom-0 left-0 mb-5 ms-7 text-2xl font-semibold text-gray-900 text-white bg-black rounded-full px-3">
              <h1>{selectedPlace.rating} ⭐</h1>
            </div> */}

          </div>
        </motion.div>
      </div>
    </motion.div>
  ) : null;
};

export default Popup;
