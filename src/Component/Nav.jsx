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

  useEffect(() => {
    setCurrentNav(location.pathname);
  }, [location]);

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
            className="fixed top-0 left-0 h-full w-64 bg-slate-300/75 text-black p-8 z-50 flex flex-col justify-between"
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
            <div className="mt-8">
              <div
                className="relative w-24 h-10 bg-gray-600 rounded-full shadow-inner flex items-center justify-center cursor-pointer"
                onClick={toggleLanguage}
              >
                <motion.div
                  className="absolute w-1/2 h-full bg-gray-800 rounded-full"
                  initial={{ x: language === "en" ? 0 : "100%" }}
                  animate={{ x: language === "en" ? 0 : "100%" }}
                  transition={{ type: "spring", stiffness: 700, damping: 30 }}
                />
                <div className="w-1/2 text-center text-white z-10">EN</div>
                <div className="w-1/2 text-center text-white z-10">ID</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Nav;
