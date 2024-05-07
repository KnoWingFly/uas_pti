import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon } from '@heroicons/react/outline';


const navigation = [
  { name: 'Gallery', href: '#', current: true },
  { name: 'Discover', href: '#', current: false },
  { name: 'Templates', href: '#', current: false },
  { name: 'Updates', href: '#', current: false },
  { name: 'Blog', href: '#', current: false }
];

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${isOpen ? 'pointer-events-none' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-0 right-0 m-4 z-50 pointer-events-auto"
      >
        <MenuIcon className="h-6 w-6 text-white" />
      </button>
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="fixed top-0 left-0 h-full w-64 bg-black text-white p-8 z-50"
          >
            <div className="flex flex-col space-y-4">
            
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`text-xl ${item.current ? 'font-bold' : ''} hover:text-gray-300`}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {item.name}
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
