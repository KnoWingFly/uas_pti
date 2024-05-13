import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useApi } from "./API.jsx";
import Popup from "./Popup.jsx";
import { places } from "./DataPlace.js";

const CategoryCard = ({ searchTerm }) => {
  const { data } = useApi();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false); 

  const categories = [...new Set(places.map((place) => place.category))];

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

  const filteredPlaces = places.filter(
    (place) =>
      (!selectedCategory || place.category === selectedCategory) && 
      place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-5">
      {/* Tampilkan dropdown kategori */}
      <div className="relative inline-block text-left mb-4 mt-2 z-10">
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white"
          onClick={() => setShowCategories(!showCategories)}
        >
          Category
        </button>
        {showCategories && (
          <div className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[15]">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowCategories(false);
                  }}
                  role="menuitem"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center mx-4 md:mx-8 lg:mx-16">
        {filteredPlaces.map((place, index) => (
          <div
            key={index}
            className="relative w-50 h-50 md:h-60 lg:h-70 rounded shadow-lg m-2 overflow-hidden group bg-black"
            onClick={() => handleClick(place)}
          >
            <img
              className="w-full h-full object-cover rounded transition duration-300 group-hover:opacity-50 scale-100 group-hover:scale-110 ease-in-out"
              src={place.image}
              alt={place.name}
            />

            <div className="absolute inset-x-0 top-0 flex justify-center items-center cursor-pointer group">
              <div className="group-hover:bg-gradient-to-t from-transparent to-black h-full w-full object-cover absolute transition-all duration-300 ease-in-out"></div>
              {/* <div className="group-hover:bg-white h-full w-full object-cover absolute z-10 transition duration-1000 ease-in-out"></div> */}
              {/* <p className="opacity-0 group-hover:opacity-100 duration-300 absolute inset-0 flex justify-center items-start text-white font-semibold pt-5"> */}
              <p className="opacity-0 group-hover:opacity-100 duration-300 text-white font-semibold flex text-center p-5 z-[8]">
                {place.shortDesc}
              </p>
            </div>

            <div className="font-bold text-xs text-white ms-2 mb-1 absolute bottom-0 left-0 bg-black opacity-80 rounded-full px-3">
              {place.name}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && (
          <Popup
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedPlace={selectedPlace}
            currentPage={currentPage}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            data={data}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryCard;
