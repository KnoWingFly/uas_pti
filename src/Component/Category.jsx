import React, { useState, useContext } from "react";
import CategoryCard from "./CategoryCard";
import Nav from "./Nav";
import Footer from "./Footer";
import Search from "./Search";
import { LanguageContext } from "./LanguageContent"; 

function Category() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpenNav, setIsOpenNav] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav isOpen={isOpenNav} setIsOpen={setIsOpenNav} language={language} setLanguage={setLanguage} />
      <CategoryCard searchTerm={searchTerm} language={language} />
      <div className="mt-auto">
          <Footer />
      </div>
    </div>
  );
}

export default Category;
