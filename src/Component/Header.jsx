import React, { useState, useEffect } from 'react';
import TobaLake from '../img/lake_toba.jpg';
import muaratapanuli from '../img/Muara_Tapanuli.jpg';


const places = [
    { name: 'Danau Toba', image: TobaLake },
    { name: 'Muara Tapanuli Utara', image: muaratapanuli }
  ];

  function Header() {
    const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setIsChanging(true);
        setTimeout(() => {
          setCurrentPlaceIndex((currentPlaceIndex + 1) % places.length);
          setIsChanging(false);
        }, 1000); // Transition duration
      }, 5000);
      return () => clearInterval(timer); // Clean up the timer
    }, [currentPlaceIndex]);
  
    return(
        <div className="relative h-3/4">
        <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${isChanging ? 'opacity-0' : 'opacity-100'}`} style={{backgroundImage: `url(${places[currentPlaceIndex].image})`}} />
        <div className="relative h-full flex flex-col justify-between">
        <div className="p-4 flex justify-center">
          <div className="flex items-center p-2 rounded-full bg-white text-black w-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
            <input 
              type="text" 
              placeholder="Where can we take you?" 
              className="bg-transparent w-full outline-none ml-2"
            />
          </div>
        </div>


          <div className="p-4">
            <h1>Discover your next vacation</h1>
            <div className="pt-2 flex justify-start">
            <div className={`p-2 rounded-full inline-flex items-center relative transition-all duration-1000 ease-in-out ${isChanging ? 'transform translate-x-10 scale-125 opacity-0' : 'transform translate-x-0 scale-100 opacity-100'}`}>
            <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
            <div className="relative z-10 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl overflow-hidden whitespace-nowrap text-overflow-ellipsis">{places[currentPlaceIndex].name}</span>
            </div>
          </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Header;