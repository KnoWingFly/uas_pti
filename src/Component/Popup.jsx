import React from 'react';
import { motion } from 'framer-motion';
import MapComponent from "./Map.jsx";

const Popup = ({ isOpen, setIsOpen, selectedPlace, currentPage, handleNext, handlePrevious, data }) => {
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
          style={{ width: '1000px', height: '600px' }}
        >
          <button
            onClick={() => setIsOpen(false)}
            type="button"
            className="absolute top-0 right-0 m-2 inline-flex justify-center rounded-md border border-transparent px-2 py-1 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            X
          </button>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex h-full w-full">
            <div className="w-1/2 h-full overflow-auto">
              <img className="w-full h-full object-cover rounded transition duration-300" src={selectedPlace.image} alt={selectedPlace.name} />
            </div>
            <div className="w-1/2 h-full overflow-auto p-4">
               {currentPage === 0 && <div><h2 className="text-lg leading-6 font-medium text-gray-900">Description</h2><p>{selectedPlace.description}</p></div>} 
               {currentPage === 1 && <div><h2 className="text-lg leading-6 font-medium text-gray-900">Images</h2><p>{selectedPlace.moreImages}</p></div>} 
               {currentPage === 2 && data && data.position && <div><h2 className="text-lg leading-6 font-medium text-gray-900">Map</h2><div className="h-full w-full"><MapComponent position={data.position} zoom={13} /></div></div>}
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
  );
};

export default Popup;
