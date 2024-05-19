import React, { useRef, useState, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './style.css';
import stevjo from "../img/stevjo.jpeg";
import fernando from "../img/fernando.jpg";
import virya from "../img/virya.png";
import fabian from "../img/fabian.jpg";
import { EffectCoverflow, Pagination } from 'swiper/modules';
import Nav from "./Nav";
import Footer from './Footer';
import { LanguageContext } from "./LanguageContent"; 

export default function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpenNav, setIsOpenNav] = useState(false);
    const { language, setLanguage } = useContext(LanguageContext);

    return (
        <><div className='flex flex-col min-h-screen'>
            <div>
                <Nav isOpen={isOpenNav} setIsOpen={setIsOpenNav} language={language} setLanguage={setLanguage} />
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
                    <img src={virya} className='mt-10px' />
                    <h1 className='text-white text-center font-bold text-base'>Anggatha Chandra Virya</h1>
                    <h1 className='text-white text-center font-extralight'>00000082588</h1>
                </SwiperSlide>
                <SwiperSlide className='flex flex-col items-center'>
                    <img src={fernando} className='mt-10px' />
                    <h1 className='text-white text-center font-bold text-base'>Fernando Sunarto</h1>
                    <h1 className='text-white text-center font-extralight'>00000083441</h1>
                </SwiperSlide>
                <SwiperSlide className='flex flex-col items-center'>
                    <img src={stevjo} className='mt-10px' />
                    <h1 className='text-white text-center font-bold text-base'>Steven Jonathan</h1>
                    <h1 className='text-white text-center font-extralight'>00000087645</h1>
                </SwiperSlide>
                <SwiperSlide className='flex flex-col items-center'>
                    <img src={fabian} className='mt-10px' />
                    <h1 className='text-white text-center font-bold text-base'>Fabian Dustin Candra</h1>
                    <h1 className='text-white text-center font-extralight'>00000087657</h1>
                </SwiperSlide>
            </Swiper>
            <div className='mt-auto'>
                <Footer></Footer>
            </div>
        </div>
        </>
    );
}
