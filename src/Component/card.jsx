import React from 'react';
import TobaLake from '../img/lake_toba.jpg';
import muaratapanuli from '../img/Muara_Tapanuli.jpg';
import samosir from '../img/samosir.jpg';
import holbung from '../img/bukit-holbung.png';
import gerejaLondon from '../img/Gedung-London-Sumatera.png';
import maimun from '../img/Istana_maimun.png';
import sibolangit from '../img/Hillpark-Sibolangit.png';
import sorake from '../img/pantai-sorake.png';
import maitreya from '../img/Vihara_Maitreya.png';
import mashun from '../img/Masjid_Al_Mashun.png';
import velangkani from '../img/Gereja_Velangkani_Medan.png';
import funland from '../img/mikie-funland.png';


const places = [
    { name: 'Danau Toba', image: TobaLake, shortDesc: 'mmm Lake'},
    { name: 'Muara Tapanuli Utara', image: muaratapanuli , shortDesc: 'Nordt'},
    { name: 'Pulau Samosir', image: samosir, shortDesc: 'Samosa' },
    { name: 'Bukit Holbung', image: holbung, shortDesc: 'Hobit' },
    { name: 'Gedung London Sumatera', image: gerejaLondon, shortDesc: 'Dondon' },
    { name: 'Istana Maimun', image: maimun, shortDesc: 'Timun' },
    { name: 'Hillpark Sibolangit', image: sibolangit, shortDesc: 'King of The Hill' },
    { name: 'Pantai Sorake', image: sorake, shortDesc: 'Serokan' },
    { name: 'Vihara Maitreya', image: maitreya, shortDesc: 'Virya' },
    { name: 'Masjid Al Mashun', image: mashun, shortDesc: 'Bismillah' },
    { name: 'Gereja Velangkani Medan', image: velangkani, shortDesc: 'Mr Medan' },
    { name: 'Mikie Funland', image: funland, shortDesc: 'Mickey Mouse' }
];

const Card = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center mt-20 mx-10 md:mx-20 lg:mx-40">
            {places.map((place, index) => (

                <div key={index} className="relative w-50 h-50 md:h-60 lg:h-70 rounded shadow-lg m-2 overflow-hidden group bg-black">

                    <img className="w-full h-full object-cover rounded transition duration-300 group-hover:opacity-50 scale-100 group-hover:scale-110 ease-in-out" src={place.image} alt={place.name} />

                    <p className="opacity-0 group-hover:opacity-100 duration-300 absolute inset-0 flex justify-center items-start text-white font-semibold pt-5">{place.shortDesc}</p>

                    <div className="font-bold text-xs text-white ms-2 mb-1 absolute bottom-0 left-0 bg-black opacity-80 rounded-full px-3">{place.name}</div>

                </div>
            ))}
        </div>
    );
};

export default Card;