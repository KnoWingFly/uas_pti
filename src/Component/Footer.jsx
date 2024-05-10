import React from "react";
import Logo from "../img/logo.png";

export default function Footer() {
    return (
        <footer class="bg-black w-full my-4">
            <div class="w-full max-w-screen mx-auto p-4 md:py-8">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <a href="#" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src={Logo} class="h-36" alt="Sumatera Utara Logo" />
                        <span class="self-center text-4xl font-semibold whitespace-nowrap text-white hover:text-green-700">Sumatera Utara</span>
                    </a>
                    <ul class="flex flex-wrap items-center mb-6 text-lg font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" class="hover:underline me-4 md:me-6 hover:text-green-700">Home</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline me-4 md:me-6 hover:text-green-700">Category</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline me-4 md:me-6 hover:text-green-700">About Us</a>
                        </li>
                        <li>
                            <a href="https://github.com/KnoWingFly/uas_pti/" class="hover:underline me-10 hover:text-green-700">GitHub</a>
                        </li>
                    </ul>
                </div>
                <hr class="my-6 sm:mx-auto border-gray-700 lg:my-8" />
                <span class="block text-sm sm:text-center text-gray-400">© 2024 <a href="#" class="hover:underline hover:text-green-700">Sumatera Utara™</a>. All Rights Reserved.</span>
            </div>
        </footer>

    );
}