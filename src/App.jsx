import React, { useState, Suspense } from "react";
const Nav = React.lazy(() => import("./Component/Nav.jsx"));
const Header = React.lazy(() => import("./Component/Header.jsx"));
const Card = React.lazy(() => import("./Component/card.jsx"));
const Footer = React.lazy(() => import("./Component/Footer.jsx"));
const Popup = React.lazy(() => import("./Component/Popup.jsx"));
const Search = React.lazy(() => import("./Component/Search.jsx"));
const CategoryCard = React.lazy(()=> import("./Component/CategoryCard.jsx"))

function App() {
  const [isOpenNav, setIsOpenNav] = useState(false); // State to control the navbar
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // State to control current page in popup
  const [isOpenPopup, setIsOpenPopup] = useState(false); // State to control the popup
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true); // State to control the visibility of the search bar

  const handleSuggestionClick = (place) => {
    setSelectedPlace(place);
    setIsOpenPopup(true); // Open the popup when a suggestion is clicked
    setIsSearchBarVisible(false); // Hide the search bar when opening the popup
    setIsOpenNav(false); // Close the navbar when a suggestion is clicked
  };

  const handleClosePopup = () => {
    setSelectedPlace(null);
    setIsOpenPopup(false);
    setCurrentPage(0); // Reset current page when closing the popup
    setIsSearchBarVisible(true); // Show the search bar when closing the popup
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="App bg-white min-h-screen text-white">
      <Suspense fallback={<div>Loading...</div>}>
        <Nav isOpen={isOpenNav} setIsOpen={setIsOpenNav} />
        <Header isOpen={isOpenNav} onSuggestionClick={handleSuggestionClick} setSearchTerm={setSearchTerm} />
        {/* Render CategoryCard */}
        <CategoryCard category="Religion" searchTerm={searchTerm} />
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
      </Suspense>
    </div>
  );
}

export default App;
