import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {places} from './DataPlace.js';

const Card = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); 

  const totalPage = 3
  const handleClick = (place) => {
    setIsOpen(true);
    setSelectedPlace(place);
    setCurrentPage(0); 
  };

  const handleNext = () => {
    const totalPages = 3; 
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center mt-20 mx-10 md:mx-20 lg:mx-40">
      {places.map((place, index) => (
        <div
          key={index}
          className="relative w-50 h-50 md:h-60 lg:h-70 rounded shadow-lg m-2 overflow-hidden group bg-black"
          onClick={() => handleClick(place)}
        >
          <img className="w-full h-full object-cover rounded transition duration-300 group-hover:opacity-50 scale-100 group-hover:scale-110 ease-in-out" src={place.image} alt={place.name} />
          <p className="opacity-0 group-hover:opacity-100 duration-300 absolute inset-0 flex justify-center items-start text-white font-semibold pt-5">{place.shortDesc}</p>
          <div className="font-bold text-xs text-white ms-2 mb-1 absolute bottom-0 left-0 bg-black opacity-80 rounded-full px-3">{place.name}</div>
        </div>
      ))}

        <AnimatePresence>
        {isOpen && (
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
                style={{ width: '1100px', height: '500px' }}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  className="absolute top-0 right-0 m-2 inline-flex justify-center rounded-md border border-transparent px-2 py-1 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  X
                </button>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex h-full">
                  <div className="w-1/2 h-full overflow-auto">
                    <img className="w-full h-full object-cover rounded transition duration-300" src={selectedPlace.image} alt={selectedPlace.name} />
                  </div>
                  <div className="w-1/2 h-full overflow-auto p-4">
                    {currentPage === 0 && <div><h2 className="text-lg leading-6 font-medium text-gray-900">Description</h2><p>{selectedPlace.description}</p></div>} 
                    {currentPage === 1 && <div><h2 className="text-lg leading-6 font-medium text-gray-900">Images</h2><p>{selectedPlace.moreImages}</p></div>} 
                    {currentPage === 2 && <div><h2 className="text-lg leading-6 font-medium text-gray-900">Map</h2><p>{selectedPlace.map}</p></div>} 
                  </div>
                  <div className="absolute bottom-0 right-0 m-4">
                    {currentPage > 0 && (
                      <button
                        onClick={handlePrevious}
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5 mr-2"
                      >
                        Previous
                      </button>
                    )}
                    {currentPage < totalPage - 1 && (
                      <button
                        onClick={handleNext}
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Card;