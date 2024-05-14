import React, {useState} from "react";
import CategoryCard from "./CategoryCard";
import Nav from "./Nav";
import Footer from "./Footer";

function Category() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpenNav, setIsOpenNav] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Nav isOpen={isOpenNav} setIsOpen={setIsOpenNav} />
      <CategoryCard searchTerm={searchTerm} />
      <div className="mt-auto">
          <Footer />
      </div>
    </div>
  );
}

export default Category;