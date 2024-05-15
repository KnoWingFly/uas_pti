import React, { useState } from "react";
const Nav = React.lazy(() => import("./Component/Nav.jsx"));
const Header = React.lazy(() => import("./Component/Header.jsx"));
const Card = React.lazy(() => import("./Component/card.jsx"));
const Footer = React.lazy(() => import("./Component/Footer.jsx"));
const Popup = React.lazy(() => import("./Component/Popup.jsx"));
const Search = React.lazy(() => import("./Component/Search.jsx"));

const Home = () =>   {
  const [isOpenNav, setIsOpenNav] = useState(false); 
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0); 
  const [isOpenPopup, setIsOpenPopup] = useState(false); 
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true); 

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
        <Nav isOpen={isOpenNav} setIsOpen={setIsOpenNav} />
        <Header isOpen={isOpenNav} onSuggestionClick={handleSuggestionClick} setSearchTerm={setSearchTerm} />
        <Card searchTerm={searchTerm} />
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
        />
    </div>
  );
}

export default Home;