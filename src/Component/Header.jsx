import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import Search from "./Search";
import axios from 'axios';
import { motion } from "framer-motion";

function Header({ isOpen, setSearchTerm, onSuggestionClick }) {
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
  const [places, setPlaces] = useState([]);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const discoverRef = useRef(null);

  const nextPlace = useCallback(() => {
    setCurrentPlaceIndex((prevIndex) => (prevIndex + 1) % places.length);
    animateTransition();
  }, [places]);

  const prevPlace = useCallback(() => {
    setCurrentPlaceIndex(
      (prevIndex) => (prevIndex - 1 + places.length) % places.length
    );
    animateTransition();
  }, [places]);

  const animateTransition = () => {
    if (bgRef.current && textRef.current && discoverRef.current && gsap) {
      gsap.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      );
      gsap.fromTo(
        discoverRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api-sumatra.vercel.app/places');
        const apiPlaces = response.data;
        console.log(apiPlaces); // Check if data is fetched successfully
        const sortedPlaces = apiPlaces.sort((a, b) => b.rating - a.rating);
        const top5Places = sortedPlaces.slice(0, 5);
        const placesWithImages = await Promise.all(top5Places.map(async (place) => {
          try {
            const imageResponse = await axios.get(`https://api-sumatra.vercel.app/img/${place.image}`, {
              responseType: 'blob'
            });

            const reader = new FileReader();
            reader.readAsDataURL(imageResponse.data);

            return new Promise((resolve, reject) => {
              reader.onloadend = () => {
                place.imageData = reader.result;
                resolve(place);
              };
              reader.onerror = reject;
            });
          } catch (error) {
            console.error(`Error fetching image for place ${place.name}:`, error);
            place.imageData = null;
            return place;
          }
        }));

        setPlaces(placesWithImages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (places.length > 0) {
        nextPlace();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [places, nextPlace]);

  return (
    <div className="relative min-h-[75vh]">
      <Search
        isOpen={isOpen}
        setSearchTerm={setSearchTerm}
        onSuggestionClick={onSuggestionClick}
      />
      <div className="relative min-h-[75vh] flex flex-col justify-center items-start">
        <div>
          {places.length > 0 && places[currentPlaceIndex] ? (
            <div
              ref={bgRef}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${places[currentPlaceIndex].imageData})`
              }}
            >
              <div className="bg-gradient-to-b from-transparent from-5% via-transparent via-65% to-white relative inset-x-0 bottom-0 w-full h-full"></div>
            </div>
          ) : null}

          <div className="p-4 absolute bottom-0 left-0 text-left">
            <h1
              ref={discoverRef}
              className="text-2xl font-semibold text-white mb-2 ms-1"
            >
              Discover your next vacation
            </h1>
            <div
              ref={textRef}
              className="p-2 backdrop-blur-md mb-16 rounded-full inline-flex border border-4 border-white items-center relative scale-100 opacity-100 px-5 pe-7"
            >
              <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
              
              <div className="relative z-10 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>

                <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl overflow-hidden whitespace-nowrap text-overflow-ellipsis">
                  {places.length > 0 && places[currentPlaceIndex] && places[currentPlaceIndex].name}
                </span>

              </div>
            </div>
          </div>
          
          <div className="p-4 flex justify-center items-center absolute inset-0 w-full" >
            <motion.button
              onClick={prevPlace}
              className="absolute left-0 transform ms-5 bg-green-700 backdrop-blur-md rounded-full hover:bg-green-600"
              whileHover={{ scale: 1.2 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                className="w-12 h-12">

                <path 
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />

              </svg>

            </motion.button>
            <motion.button
              onClick={nextPlace}
              className="absolute right-0 transform me-5 bg-green-700 backdrop-blur-md rounded-full hover:bg-green-600"
              whileHover={{ scale: 1.2 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-12 h-12">

              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />

              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;