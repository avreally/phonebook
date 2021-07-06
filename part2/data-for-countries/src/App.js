import React, { useEffect, useState } from "react";
import axios from "axios";

const FindCountries = ({ findCountry, handleFindChange }) => {
  return (
    <div>
      Find countries: <input value={findCountry} onChange={handleFindChange} />
    </div>
  );
};

const OneCountry = ({ country }) => {
  // console.log("OneCountry props are", country)
  return (
    <div>
      <h3>{country.name}</h3>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <p>
        <b>Languages: </b>
      </p>
      <p>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </p>
      <img src={country.flag} alt="flag" width="100" />
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
    return <OneCountry country={filteredCountries[0]} />;
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [findCountry, setFindCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState();
  console.log("findCountry is ", findCountry);

  const handleFindChange = (event) => {
    setSelectedCountry(undefined);
    console.log(event.target.value);
    setFindCountry(event.target.value);
  };

  const filterItems = (arr, query) => {
    return arr.filter((el) =>
      el.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredCountries = filterItems(countries, findCountry);
  console.log("filteredCountries are", filteredCountries);

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
        <OneCountry country={selectedCountry} />
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
