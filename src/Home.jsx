import React, { useState, useContext } from "react";
import Nav from "./Component/Nav.jsx";
import Header from "./Component/Header.jsx";
import Card from "./Component/card.jsx";
import Footer from "./Component/Footer.jsx";
import Popup from "./Component/Popup.jsx";
import Search from "./Component/Search.jsx";
import { LanguageContext } from "./Component/LanguageContent.js";

const Home = () => {
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  const { language, setLanguage } = useContext(LanguageContext);

  const handleSuggestionClick = (place) => {
    setSelectedPlace(place);
    setIsOpenPopup(true);
    setIsSearchBarVisible(false);
    setIsOpenNav(false);
  };

  const handleClosePopup = () => {
    setSelectedPlace(null);
    setIsOpenPopup(false);
    setCurrentPage(0);
    setIsSearchBarVisible(true);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="App bg-white min-h-screen text-white">
      <Nav isOpen={isOpenNav} setIsOpen={setIsOpenNav} language={language} setLanguage={setLanguage} />
      <Header 
        isOpen={isOpenNav} 
        onSuggestionClick={handleSuggestionClick} 
        setSearchTerm={setSearchTerm} 
        language={language}
      />
      <Card searchTerm={searchTerm} language={language} />
      <Footer />
      <Popup 
        isOpen={isOpenPopup} 
        setIsOpen={setIsOpenPopup} 
        selectedPlace={selectedPlace} 
        currentPage={currentPage} 
        handleNext={handleNext} 
        handlePrevious={handlePrevious} 
        onClose={handleClosePopup} 
        setIsSearchBarVisible={setIsSearchBarVisible}
      />
      <Search 
        onSuggestionClick={handleSuggestionClick} 
        isSearchBarVisible={!isOpenNav && (!isOpenPopup || isSearchBarVisible)} 
        language={language}
      />
    </div>
  );
}

export default Home;
