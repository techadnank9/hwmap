import React from 'react';

const CityList = ({ cities, onSelect,onStartingCitySelect }) => {
  return (
    <div>
     <label>Starting City: </label>
      <select onChange={(e) => onStartingCitySelect(e.target.value)}>
        <option value="" disabled selected>Select a starting city</option>
        {cities.map(city => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>

      <label>Destination City : </label>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="" disabled selected >Select Destination City</option>
        {cities.map(city => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityList;
