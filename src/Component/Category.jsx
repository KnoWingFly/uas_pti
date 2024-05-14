import React, {useState} from "react";
import CategoryCard from "./CategoryCard";
import Nav from "./Nav";
import Footer from "./Footer";

function Category() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpenNav, setIsOpenNav] = useState(false);
  
  return (
    <div>
      <Nav isOpen={isOpenNav} setIsOpen={setIsOpenNav} />
      <CategoryCard searchTerm={searchTerm} />
      <Footer />
    </div>
  );
}

export default Category;
