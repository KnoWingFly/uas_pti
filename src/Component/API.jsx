import { useState, useEffect } from "react";
import axios from "axios";

export function useApi(searchQuery) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = "939d69c9-d9b4-519a-2b1f-a34bef6c";
    const apiUrl = `https://api.goapi.io/places?search=${encodeURIComponent(searchQuery)}&api_key=${apiKey}`;

    axios
      .get(apiUrl, {
        headers: {
          accept: "application/json",
          "X-API-KEY": apiKey,
        },
      })
      .then((response) => {
        const { lat, lng } = response.data.data.results[0];
        setData({ position: [lat, lng] });
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
      });
  }, [searchQuery]);

  return { data, error };
}
