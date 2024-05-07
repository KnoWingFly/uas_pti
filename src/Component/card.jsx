import React from 'react';
import TobaLake from '../img/lake_toba.jpg';
import muaratapanuli from '../img/Muara_Tapanuli.jpg';
import lumbinipark from '../img/taman-alam-lumbini.jpg';
import samosir from '../img/samosir.jpg';

const places = [
    { name: 'Danau Toba', image: TobaLake },
    { name: 'Muara Tapanuli Utara', image: muaratapanuli },
    { name: 'Taman Alam Lumbini', image: lumbinipark },
    { name: 'Pulau Samosir', image: samosir }
];

const Card = () => {
    return (
        <div className="flex flex-wrap justify-between mt-20">
            {places.map((place, index) => (
                <div key={index} className="bg-white max-w-sm rounded overflow-hidden shadow-lg m-2 flex-auto">
                    <img className="w-full" src={place.image} alt={place.name} />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 text-black">{place.name}</div>
                        <p className="text-gray-700 text-base">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
