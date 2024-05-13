import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom"; // Tambahkan impor Link

const navigation = [
  { name: "Main", href: "/", current: true },
  { name: "Category", href: "/category", current: false }, 
  { name: "Templates", href: "#", current: false },
  { name: "Updates", href: "#", current: false },
  { name: "Blog", href: "#", current: false },
];

function Nav({ isOpen, setIsOpen }) {
  return (
    <div>
      {/* Tombol untuk membuka dan menutup navbar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-0 right-0 m-4 z-50 backdrop-blur-md"
      >
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <XIcon className="h-8 w-12 p-1 border border-white rounded-md bg-black/50 item-xl text-white" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MenuIcon className="h-8 w-12 p-1 border border-white rounded-md bg-black/50 item-xl text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      {/* Overlay untuk menutup navbar saat diklik */}
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
              {/* Membuat menu navigasi */}
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`text-xl ${item.current ? "font-bold" : ""} hover:text-black`}
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
                  {/* Menggunakan Link untuk mengarahkan ke halaman kategori */}
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
