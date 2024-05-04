import React , { useState, useEffect } from 'react';
import logo from './img/logo.png';
import { Disclosure } from '@headlessui/react'
import TobaLake from './img/lake_toba.jpg';
import muaratapanuli from './img/Muara_Tapanuli.jpg';
import { Bars3Icon,XMarkIcon } from '@heroicons/react/24/outline'
import './App.css';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

const places = [
  { name: 'Danau Toba', image: TobaLake },
  { name: 'Muara Tapanuli Utara', image: muaratapanuli }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function App() {
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentPlaceIndex((currentPlaceIndex + 1) % places.length);
        setIsChanging(false);
      }, 1000); // Transition duration
    }, 5000);
    return () => clearInterval(timer); // Clean up the timer
  }, [currentPlaceIndex]);

  return (
    <div className="App">
    <div className="bg-black text-white h-screen">
      {/* NavBar */}
      <Disclosure as="nav" className="bg-black">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img src={logo} alt="Logo" className="w-10" />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>

      {/* Header */}
      <div className="relative h-3/4">
        <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${isChanging ? 'opacity-0' : 'opacity-100'}`} style={{backgroundImage: `url(${places[currentPlaceIndex].image})`}} />
        <div className="relative h-full flex flex-col justify-between">
        <div className="p-4 flex justify-center">
          <div className="flex items-center p-2 rounded-full bg-white text-black w-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
            <input 
              type="text" 
              placeholder="Where can we take you?" 
              className="bg-transparent w-full outline-none ml-2"
            />
          </div>
        </div>


          <div className="p-4">
            <h1>Discover your next vacation</h1>
            <div className="pt-2 flex justify-start">
            <div className={`p-2 rounded-full inline-flex items-center relative transition-all duration-1000 ease-in-out ${isChanging ? 'transform translate-x-10 scale-125 opacity-0' : 'transform translate-x-0 scale-100 opacity-100'}`}>
            <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
            <div className="relative z-10 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl overflow-hidden whitespace-nowrap text-overflow-ellipsis">{places[currentPlaceIndex].name}</span>
            </div>
          </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
