import React, { useEffect, useState } from "react";
import axios from "axios";

const FindCountries = ({ findCountry, handleFindChange }) => {
  return (
    <div>
      Find countries: <input value={findCountry} onChange={handleFindChange} />
    </div>
  );
};

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const Weather = ({ capital }) => {
  const [showWeather, setShowWeather] = useState();

  useEffect(() => {
    console.log("weather effect");
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`
      )
      .then((response) => {
        console.log("weather promise fulfilled");
        setShowWeather(response.data);
      });
  }, [capital]);

  if (!showWeather) {
    return null;
  }

  const weather = showWeather.current;
  return (
    <div>
      <h4>Weather in {capital}</h4>
      <div>
        <b>temperature:</b> {weather.temperature} Celcius
      </div>
      <img src={weather.weather_icons} alt="weather icon" width="100" />
      <div>
        <b>wind:</b> {weather.wind_speed} km/h direction {weather.wind_dir}
      </div>
    </div>
  );
};

const OneCountry = ({ country, capital }) => {
  return (
    <div>
      <h3>{country.name}</h3>
      <div>Capital: {capital}</div>
      <div>Population: {country.population}</div>
      <h4>Spoken languages:</h4>
      <p>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </p>
      <img src={country.flag} alt="flag" width="100" />
      <Weather capital={capital} />
    </div>
  );
};

const SearchResult = ({ filteredCountries, findCountry, onShowClick }) => {
  if (findCountry === "") {
    return <div></div>;
  } else if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map((filteredCountry) => (
          <div key={filteredCountry.alpha2Code}>
            {filteredCountry.name}
            <button onClick={() => onShowClick(filteredCountry)}>
              show me!
            </button>
          </div>
        ))}
      </div>
    );
  } else if (filteredCountries.length === 1) {
    return (
      <OneCountry
        country={filteredCountries[0]}
        capital={filteredCountries[0].capital}
      />
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [findCountry, setFindCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState();

  const handleFindChange = (event) => {
    setSelectedCountry(undefined);
    setFindCountry(event.target.value);
  };

  const filterItems = (arr, query) => {
    return arr.filter((el) =>
      el.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredCountries = filterItems(countries, findCountry);

  const handleShowClick = (country) => {
    setSelectedCountry(country);
  };

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <FindCountries
        handleFindChange={handleFindChange}
        findCountry={findCountry}
      />
      {selectedCountry ? (
        <OneCountry
          country={selectedCountry}
          capital={selectedCountry.capital}
        />
      ) : (
        <SearchResult
          filteredCountries={filteredCountries}
          findCountry={findCountry}
          onShowClick={handleShowClick}
        />
      )}
    </div>
  );
};

export default App;
