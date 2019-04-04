import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Filter = ({handleInput, value}) => {
  return(
  <div> 
    rajaa näytettäviä: 
    <input
        value={value}
        onChange={handleInput}
    />
  </div>
  )
}

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
        <div>
          <h2>Lisää henkilö</h2>
          nimi: 
          <input 
            value={props.newName}
            onChange={props.handleNoteChange}
          />
        </div>
        <div>numero: 
          <input
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>
        <button type='submit'>lisää henkilö</button>
  </form>
)

const Persons = ({listToShow}) => (
  listToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterName, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])

  const listToShow = (newFilterName.length > 0) ? persons.filter(pers => pers.name.includes(newFilterName)) : persons

  const addPerson = (event) => {
    event.preventDefault()
    const duplicates = persons.filter((person) => {
      return person.name === newName
    })
    if (duplicates.length > 0) {
      window.alert(`${newName} on jo luettelossa`)
    } else {
    const person = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
    }
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter handleInput={handleFilterChange} value={newFilterName} />
      <h3>lisää uusi</h3>
      <PersonForm addPerson={addPerson} newName={newName} 
      handleNoteChange={handleNoteChange} newNumber={newNumber} 
      handleNumberChange={handleNumberChange} />
      <h2>Numerot</h2>
      <Persons listToShow={listToShow}/>
    </div>
  )

}

export default App;