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

const ShowCountries = ({filteredList, handleClick}) => {
  if (filteredList.length > 10) {
    return (
      <p>too many matches, specify another filter</p>
    )
  } else if (filteredList.length === 1 ) {
    return (
    <div>
      <h2>{filteredList.map(country => <p key={country.name}>{country.name}</p>)}</h2>
      <p>capital {filteredList.map(i => i.capital)}</p>
      <p>population {filteredList.map(i => i.population)}</p>
      <h3>languages</h3>
      <ul>
        {filteredList.map(i => i.languages.map(j => <li key={j.name}>{j.name}</li>))}
      </ul>
      <picture>
        <img src= {filteredList.map(i => i.flag)} alt='flag' style={{maxHeight: 150}}></img>
      </picture>
    </div>
    )
  } else {
    return (
      filteredList.map(country => <p key={country.name}>{country.name} <button onClick={handleClick()} value={country.name}>show</button></p>)
    )
  }
}

const App = () => {
 const [countriesList, setCountries] = useState([])
 const [query, setQuery] = useState('Fin') 

  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setQuery(event.target.value)
    console.log('new search term:', query)
  }

  const filteredList = countriesList.filter(country => country.name.includes(query))
  
  console.log(countriesList)
  console.log(filteredList)

  const clickCountry = (event) => {
    setQuery(event.target.value)
  }
  
  return (
    <div>
      <h1>look for countries</h1>
      <Filter value={query} handleInput={handleFilterChange}/>
      <ShowCountries filteredList={filteredList} handleClick={ () => clickCountry}/>
    </div>
  )
}

export default App;
