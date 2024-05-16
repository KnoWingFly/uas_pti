import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./Component/LanguageContent.js";
import Home from "./Home.jsx";
import CategoryPage from "./Component/Category.jsx"; 
import AboutusPage from "./Component/aboutus.jsx";

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<CategoryPage />} /> 
          <Route path="/aboutus" element={<AboutusPage />} /> 
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
