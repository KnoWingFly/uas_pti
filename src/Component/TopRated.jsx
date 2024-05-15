import React, { useState, useEffect } from "react";
import axios from 'axios';

function TopRatedPlaces({ setPlaces, children }) {
  const [topPlaces, setTopPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api-sumatra.vercel.app/places');
        const apiPlaces = response.data;
        const sortedPlaces = apiPlaces.sort((a, b) => b.rating - a.rating);
        const top5Places = sortedPlaces.slice(0, 5);
        setTopPlaces(top5Places);
        setPlaces(top5Places); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setPlaces]); 

  return <>{children && children(topPlaces)}</>;
}

export default TopRatedPlaces;