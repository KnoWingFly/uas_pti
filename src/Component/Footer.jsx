import React from "react";
import Logo from "../img/logo.png";

export default function Footer() {
    return (
        <footer className="bg-gray-900 mt-4">
            <div className="w-full max-w-screen p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src={Logo} className="h-8" alt="SumutTourism" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white hover:text-green-700 hover:underline">Sumatera Utara</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 sm:justify-center md:justify-end">
                        <li>
                            <a href="/" className="hover:underline me-4 md:me-6 hover:text-green-600">Home</a>
                        </li>
                        <li>
                            <a href="Category" className="hover:text-green-600 hover:underline me-4 md:me-6">Category</a>
                        </li>
                        <li>
                            <a href="Aboutus" className="hover:text-green-600 hover:underline me-4 md:me-6">About Us</a>
                        </li>
                        <li>
                            <a href="https://github.com/KnoWingFly/uas_pti" className="hover:text-green-600 hover:underline">GitHub</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-600 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-white sm:text-center">© 2024 <a href="/" className="hover:underline hover:text-green-600">Sumatera Utara</a>. All Rights Reserved.</span>
            </div>
        </footer>
    );
}
