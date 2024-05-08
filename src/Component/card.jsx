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
    { name: 'Masjid Al Mashun', image: mashun, shortDesc: 'Bismillah' }
];

const Card = () => {
    return (
        <div className="flex flex-wrap justify-between mt-20 mx-60">
            {places.map((place, index) => (

                <div key={index} className="relative w-60 h-80 rounded shadow-lg m-2 overflow-hidden group bg-black">
                    
                    <img className="w-full h-full object-cover rounded transition duration-300 group-hover:opacity-50 scale-100 group-hover:scale-105 ease-in-out" src={place.image} alt={place.name} />

                    <p className="opacity-0 group-hover:opacity-100 duration-300 absolute inset-0 flex justify-center items-start text-white font-semibold pt-5">{place.shortDesc}</p>

                    <div className="font-bold text-sm text-white ms-2 mb-1 absolute bottom-0 left-0 bg-black opacity-80 rounded-full px-3">{place.name}</div>

                </div>
            ))}
        </div>
    );
};

export default Card;