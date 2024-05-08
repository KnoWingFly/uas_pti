import React from 'react';
import TobaLake from '../img/lake_toba.jpg';
import muaratapanuli from '../img/Muara_Tapanuli.jpg';
import nias from '../img/nias.jpg';
import Tanjung_Buntu from '../img/Pantai_Tanjung_Buntu.jpeg';
import Laut_Tawar from '../img/Laut_Tawar.jpg';

const places = [
    { name: 'Danau Toba', image: TobaLake},
    { name: 'Muara Tapanuli Utara', image: muaratapanuli},
    { name: 'Pulau Nias', image: nias},
    { name: 'Pantai Tanjung Buntu', image: Tanjung_Buntu},
    { name: 'Laut Tawar', image: Laut_Tawar}
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