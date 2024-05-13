import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import CategoryPage from "./Component/Category.jsx"; 

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<CategoryPage />} /> 
        </Routes>
      </BrowserRouter>
  );
}

export default App;
