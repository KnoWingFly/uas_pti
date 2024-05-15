import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion"; // Added motion import
import DataAPI from "./DataAPI.jsx";
import Popup from "./Popup.jsx";

const CategoryCard = ({ searchTerm }) => {
  const [places, setPlaces] = useState([]);
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    setSelectedCategory("All");
  }, []);

  const categories = ["All", ...new Set(places.map((place) => place.category))];

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
      (selectedCategory === "All" || place.category === selectedCategory) &&
      place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DataAPI>
      {(places) => {
        setPlaces(places);
        return (
          <div className="mt-5" id="categoryBody">
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
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="relative w-50 h-50 md:h-60 lg:h-70 rounded-lg shadow-lg m-2 overflow-hidden group bg-black"
                  onClick={() => handleClick(place)}
                >
                  <img
                    className="w-full h-full object-cover rounded transition duration-300 group-hover:opacity-50 scale-100 group-hover:scale-110 ease-in-out aspect-video"
                    src={place.imageData}
                    alt={place.name}
                  />
                  <div className="absolute inset-x-0 top-0 flex justify-center items-center cursor-pointer group">
                    <div className="group-hover:bg-gradient-to-t from-transparent to-black h-full w-full object-cover absolute transition-all duration-300 ease-in-out"></div>
                    <p className="opacity-0 group-hover:opacity-100 duration-300 text-white font-semibold flex text-center p-5 z-[8]">
                      {place.shortDesc}
                    </p>
                  </div>
                  <div className="font-bold text-xs text-white ms-2 mb-1 absolute bottom-0 left-0 bg-black opacity-80 rounded-full px-3">
                    {place.name}
                  </div>
                </motion.div>
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
      }}
    </DataAPI>
  );
};

export default CategoryCard;
