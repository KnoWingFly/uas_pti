import React from 'react';
import TobaLake from '../img/lake_toba.jpg';
import muaratapanuli from '../img/Muara_Tapanuli.jpg';
import samosir from '../img/samosir.jpg';
import holbung from '../img/bukit-holbung.png';
import gerejaLondon from '../img/Gereja-London-Sumatera.png';
import maimun from '../img/Istana-maimun.png';
import sibolangit from '../img/Hillpark-Sibolangit.png';
import sorake from '../img/pantai-sorake.png';
import maitreya from '../img/Vihara_Maitreya.png';
import mashun from '../img/Masjid_Al_Mashun.png';


const places = [
    { name: 'Danau Toba', image: TobaLake},
    { name: 'Muara Tapanuli Utara', image: muaratapanuli},
    { name: 'Pulau Samosir', image: samosir},
    { name: 'Bukit Holbung', image: holbung},
    { name: 'Gereja London Sumatera', image: gerejaLondon},
    { name: 'Istana Maimun', image: maimun},
    { name: 'Hillpark Sibolangit', image: sibolangit},
    { name: 'Pantai Sorake', image: sorake},
    { name: 'Vihara Maitreya', image: maitreya},
    { name: 'Masjid Al Mashun', image: maitreya}
];

const Card = () => {
    return (
        <div className="flex flex-wrap justify-between mt-20 mx-60">
            {places.map((place, index) => (

                <div key={index} className="relative w-60 h-80 rounded shadow-lg m-2 overflow-hidden">

                    <img className="w-full h-full object-cover rounded hover:scale-125 ease-in duration-150" src={place.image} alt={place.name}/>

                    <div className="font-bold text-sm text-white ms-2 mb-1 absolute bottom-0 left-0 bg-black opacity-80 rounded-full px-3">{place.name}</div>

                </div>
            ))}
        </div>
    );
};

export default Card;