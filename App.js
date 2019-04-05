import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      find countries 
      <input 
        value={props.value}
        onChange={props.handleInput} 
      />
    </div>
  )
}

const ShowCountries = ({countriesList}) => {
  if (countriesList.length > 10) {
    return (
      <p>too many matches, specify another filter</p>
    )
  } else if (countriesList.length === 1 ) {
    return (
    <div>
      <h2>{countriesList.map(country => <p key={country.name}>{country.name}</p>)}</h2>
      <p>capital {countriesList.map(i => i.capital)}</p>
      <p>population {countriesList.map(i => i.population)}</p>
      <h3>languages</h3>
      <ul>
        {countriesList.map(i => i.languages.map(j => <li key={j.name}>{j.name}</li>))}
      </ul>
      <picture>
        <img src= {countriesList.map(i => i.flag)} alt='flag' style={{maxHeight: 150}}></img>
      </picture>
    </div>
    )
  } else {
    return (
      countriesList.map(country => <p key={country.name}>{country.name}</p>)
    )
  }
}

const App = () => {
 const [countriesList, setCountries] = useState([])
 const [query, setQuery] = useState('Finland') 

  useEffect(() => {
    console.log('effect')
    axios.get(`https://restcountries.eu/rest/v2/name/${query}`)
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
    })
  }, [query])

  const handleFilterChange = (event) => {
    setQuery(event.target.value)
    console.log('new search term:', query)
  }
  
  console.log(countriesList)
  return (
    <div>
      <h1>look for countries</h1>
      <Filter value={query} handleInput={handleFilterChange}/>
      <ShowCountries countriesList={countriesList} />
    </div>
  )
}

export default App;
