
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityList from './city';
import Map from './Map';


const App = () => {
  const [cities, setCities] = useState([]);
  const [startingCity, setStartingCity] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [path, setPath] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/cities')
      .then(response => setCities(response.data))
      .catch(error => console.error('Error fetching cities:', error));
  }, []);

  const handleStartingCitySelect = (city) => {
    setStartingCity(city);
  };

  const handleCitySelect = async (city) => {
    try {
      const response = await axios.post('http://localhost:5000/shortest-path', { selectedCity: city ,startingCity: startingCity});
      setPath(response.data.path);
      setSelectedCity(city);
    } catch (error) {
      console.error('Error fetching path:', error);
    }
  };

  return (
    <div>
      <h1>City Path Finder</h1>
      <CityList cities={cities} onSelect={handleCitySelect} onStartingCitySelect={handleStartingCitySelect}/>
        <Map selectedCity={selectedCity} startingCity={startingCity} path={path}/>
    </div>
  );
};

export default App;