import React, { useState, useEffect } from 'react';
import { places } from './DataPlace.js';

function Search({ onSuggestionClick, isSearchBarVisible }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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
    isSearchBarVisible && (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 mt-10 z-50">
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
            onFocus={() => setShowSuggestions(inputValue.trim() !== '')} 
          />
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white text-black rounded shadow-lg">
            {suggestions.slice(0, 5).map((suggestion, index) => (
              <div key={index} className="p-2 hover:bg-gray-200 cursor-pointer flex items-center" onClick={() => handleSuggestionClick(suggestion)}>
                <img src={suggestion.image} alt={suggestion.name} className="w-6 h-6 mr-2" />
                {suggestion.name}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
}

export default Search;
