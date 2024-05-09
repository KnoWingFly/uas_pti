import React, { useEffect, useState } from 'react';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch('https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-SumateraUtara.xml')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
  
      const areas = Array.from(xmlDoc.getElementsByTagName('area'));
      const issueTimestamp = xmlDoc.getElementsByTagName('issue')[0].getElementsByTagName('timestamp')[0].textContent;
      const weatherData = areas.map(area => {
        const name = area.getElementsByTagName('name')[0].textContent;
        const parameters = Array.from(area.getElementsByTagName('parameter'));
        const weather = parameters.find(param => param.getAttribute('id') === 'hu');
            
        if (!weather) return null;

        const weatherValue = weather.getElementsByTagName('value')[0].textContent;

        return { name, weather: weatherValue, issueTimestamp };
      }).filter(item => item); 

      setWeatherData(weatherData);
    })
    .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className='text-black'>
      {weatherData && weatherData.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2>
          <p>{item.weather}</p>
          <p>Timestamp: {item.issueTimestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherComponent;
