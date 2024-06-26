import React, { useState, useEffect } from 'react';
import DataAPI from './DataAPI.jsx';

function Search({ onSuggestionClick, isSearchBarVisible, language}) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.tagName !== 'INPUT') {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const newSuggestions = places.filter(place => place.name.toLowerCase().includes(value.toLowerCase()));
    setSuggestions(newSuggestions);

    setShowSuggestions(value.trim() !== '');
  };

  const handleSuggestionClick = (suggestion) => {
    onSuggestionClick(suggestion);
    setInputValue('');
    setShowSuggestions(false);
  };

  return (
    <DataAPI language={language}>
      {(places) => {
        setPlaces(places);
        return (
          isSearchBarVisible && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mt-10 px-4  sm:px-0">
            <div className="flex items-center bg-black/70 backdrop-blur-md rounded-full border border-8 border-double border-white/75 p-2 shadow-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-3 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                className="bg-transparent outline-none flex-grow text-white placeholder-white"
                type="text"
                placeholder="Where can we take you?"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(inputValue.trim() !== '')} // Show suggestions on input focus
              />
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <>
                <div className="absolute top-full left-0 w-full bg-white/50 backdrop-blur-xl text-black rounded-md shadow-lg mt-1 divide-y divide-gray-200">
                  {suggestions.slice(0, 5).map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-200 cursor-pointer flex items-center"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <img
                        src={suggestion.imageData}
                        alt={suggestion.name}
                        className="w-8 h-8 mr-2 rounded-full"
                      />
                      {suggestion.name}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )
      );
    }}
  </DataAPI>
);
}

export default Search;
