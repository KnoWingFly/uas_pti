import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './style.css';

import stevjo from "../img/stevjo.jpeg";
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import Nav from "./Nav";
import Footer from './Footer';

export default function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpenNav, setIsOpenNav] = useState(false);
    return (
        <><div className='flex flex-col min-h-screen'>
            <div>
                <Nav isOpen={isOpenNav} setIsOpen={setIsOpenNav} />
            </div>
            <h1 className='text-center mt-10 text-5xl font-bold'>Our Team</h1>

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 20,
                    scale: 1,
                    stretch: -20,
                    depth: 120,
                    modifier: 1,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper flex items-center justify-center"
            >


                <SwiperSlide className='flex flex-col items-center'>
                    <img src={stevjo} className='mt-10px' />
                    <h1 className='text-white text-center mt-1 font-bold text-xl'>Steven Jonathan</h1>
                    <h1 className='text-white text-center font-extralight'>00000087645</h1>
                </SwiperSlide>
                <SwiperSlide className='flex flex-col items-center'>
                    <img src={stevjo} className='mt-10px' />
                    <h1 className='text-white text-center mt-1 font-bold text-xl'>Steven Jonathan</h1>
                    <h1 className='text-white text-center font-extralight'>00000087645</h1>
                </SwiperSlide>
                <SwiperSlide className='flex flex-col items-center'>
                    <img src={stevjo} className='mt-10px' />
                    <h1 className='text-white text-center mt-1 font-bold text-xl'>Steven Jonathan</h1>
                    <h1 className='text-white text-center font-extralight'>00000087645</h1>
                </SwiperSlide>
                <SwiperSlide className='flex flex-col items-center'>
                    <img src={stevjo} className='mt-10px' />
                    <h1 className='text-white text-center mt-1 font-bold text-xl'>Steven Jonathan</h1>
                    <h1 className='text-white text-center font-extralight'>00000087645</h1>
                </SwiperSlide>
            </Swiper>
            <div className='mt-auto'>
                <Footer></Footer>
            </div>
        </div>
        </>
    );
}
