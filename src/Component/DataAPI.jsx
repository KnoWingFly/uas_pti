import { useState, useEffect } from 'react';
import axios from 'axios';

function DataAPI({ children }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('https://api-sumatra.vercel.app/places');
        const placesData = response.data;

        // Fetch images for each place
        const placesWithImages = await Promise.all(placesData.map(async (place) => {
          try {
            const imageResponse = await axios.get(`https://api-sumatra.vercel.app/img/${place.image}`, {
              responseType: 'blob' // Specify responseType as blob
            });

            // Create a FileReader object
            const reader = new FileReader();

            // Read the blob as Data URL
            reader.readAsDataURL(imageResponse.data);

            // Return a promise when reading is done
            return new Promise((resolve, reject) => {
              reader.onloadend = () => {
                // Add the Data URL to the place object
                place.imageData = reader.result;
                resolve(place);
              };
              reader.onerror = reject;
            });
          } catch (error) {
            console.error(`Error fetching image for place ${place.name}:`, error);
            // If there's an error fetching the image, set imageData to null
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
  }, []);

  return children(places); // Pass places array to the children
}

export default DataAPI;
