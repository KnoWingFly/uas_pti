import { useState, useEffect } from 'react';
import axios from 'axios';

function DataAPI({ children, language }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('https://api-sumatra.vercel.app/places');
        const placesData = response.data;

        const placesWithImages = await Promise.all(placesData.map(async (place) => {
          try {
            const imageResponse = await axios.get(`https://api-sumatra.vercel.app/img/${place.image}`, {
              responseType: 'blob'
            });

            const reader = new FileReader();
            reader.readAsDataURL(imageResponse.data);

            return new Promise((resolve, reject) => {
              reader.onloadend = () => {
                place.imageData = reader.result;
                place.description = language === 'en' ? place.descriptionEN : place.description;
                place.shortDesc = language === 'en' ? place.shortDescEN : place.shortDesc;
                resolve(place);
              };
              reader.onerror = reject;
            });
          } catch (error) {
            console.error(`Error fetching image for place ${place.name}:`, error);
            place.imageData = null;
            return place;
          }
        }));

        setPlaces(placesWithImages);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, [language]);

  return children(places);
}

export default DataAPI;
