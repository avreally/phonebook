import React, { useEffect, useState } from 'react'
import axios from 'axios'

const FindCountries = ({ findCountry, handleFindChange }) => {
  return(
      <div>
        Find countries: <input
          value={findCountry} 
          onChange={handleFindChange}
          />
      </div>
  )
}

const SearchResult = ({ filteredCountries, findCountry }) => {
  if (findCountry === '') {
    return (
      <div></div>
    )
  } else if (filteredCountries.length > 10) {
    return (
    <div>Too many matches, specify another filter</div>
    )
  } else if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map(filteredCountry =>
          <div key={filteredCountry.alpha2Code}>{filteredCountry.name}
          {/* {console.log("KEY", filteredCountry.alpha2Code)} */}
          </div>)}
      </div>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        <h3>{filteredCountries[0].name}</h3>
        <div>Capital: {filteredCountries[0].capital}</div>
        <div>Population: {filteredCountries[0].population}</div>
        <p><b>Languages: </b></p>
        <p>{filteredCountries[0].languages.map(language =>
          <li key={language.iso639_1}>
            {/* {console.log("ID", language.iso639_1)} */}
            {language.name}
          </li> )}
        </p>
        <img src={filteredCountries[0].flag} alt="flag" width="100" />
      </div>
    )
  }
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ findCountry, setFindCountry ] = useState('')
  console.log('findCountry is ', findCountry)

  const handleFindChange = (event) => {
    console.log(event.target.value)
    setFindCountry(event.target.value)
  }

const filterItems = (arr, query) => {
  return arr.filter(el => el.name.toLowerCase().includes(query.toLowerCase()))
}

const filteredCountries = filterItems(countries, findCountry)
console.log('filteredCountries are', filteredCountries)

useEffect(() => {
  console.log('effect')
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
}, [])

  return (
    <div>
      <FindCountries 
        handleFindChange={handleFindChange}
        findCountry={findCountry}
      />
      <SearchResult 
      filteredCountries={filteredCountries}
      findCountry={findCountry}
      />
    </div>
  )
}

export default App
