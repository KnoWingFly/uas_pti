import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";

function Nav({ isOpen, setIsOpen, setLanguage, language }) {
  const location = useLocation();
  const [currentNav, setCurrentNav] = useState("");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "id" : "en");
  };

  useEffect(() => { // Define useEffect
    setCurrentNav(location.pathname);
  }, [location]);

  // Define navigation array
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Category", href: "/category" },
    { name: "About Us", href: "/aboutus" },
  ];

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-0 right-0 m-4 z-50 backdrop-blur-md"
      >
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <XIcon className="h-8 w-12 p-1 border border-white rounded-md bg-black/50 item-xl text-white me-2" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MenuIcon className="h-8 w-12 p-1 border border-white rounded-md bg-black/50 item-xl text-white me-2" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 120,
              ease: "easeInOut",
            }}
            className="fixed top-0 left-0 h-full w-64 bg-slate-300/75 text-black p-8 z-50"
          >
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`text-xl ${
                    currentNav === item.href ? "font-bold" : ""
                  } hover:text-black`}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{
                    scale: 1.1,
                    color: "#099e2c",
                    transition: { duration: 0.2 },
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.name === "Category" ? (
                    <Link to={item.href}>{item.name}</Link>
                  ) : (
                    item.name
                  )}
                </motion.a>
              ))}
            </div>
            {/* Language toggle button */}
            <button
              onClick={toggleLanguage}
              className="mt-auto p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 focus:outline-none"
            >
              {language === "en" ? "ID" : "EN"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Nav;
