import React, {useState} from "react";
import CategoryCard from "./CategoryCard";
import Nav from "./Nav";

function Category() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpenNav, setIsOpenNav] = useState(false);
  
  return (
    <div>
      <Nav isOpen={isOpenNav} setIsOpen={setIsOpenNav} />
      <CategoryCard searchTerm={searchTerm} />
    </div>
  );
}

export default Category;
