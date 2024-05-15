import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom"; // Add useLocation
import { useEffect, useState } from "react"; // Import useEffect and useState

const navigation = [
  { name: "Main", href: "/", current: false },
  { name: "Category", href: "/category", current: false },
  { name: "About Us", href: "/aboutus", current: false },
  { name: "GitHub", href: "https://github.com/KnoWingFly/uas_pti/", current: false },
];

function Nav({ isOpen, setIsOpen }) {
  const location = useLocation(); // Get current location
  const [currentNav, setCurrentNav] = useState(""); // State to hold current navigation item

  useEffect(() => {
    // Update currentNav when location changes
    setCurrentNav(location.pathname);
  }, [location]);

  return (
    <div>
      {/* Toggle button for opening and closing the navbar */}
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
      {/* Overlay to close the navbar when clicked */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      {/* Navbar */}
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
              {/* Creating navigation menu */}
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`text-xl ${currentNav === item.href ? "font-bold" : ""} hover:text-black`}
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
                  {/* Using Link to navigate to category page */}
                  {item.name === "Category" ? (
                    <Link to={item.href}>{item.name}</Link>
                  ) : (
                    item.name
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Nav;
