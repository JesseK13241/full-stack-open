import { useState, useEffect } from 'react'
import axios from "axios"

const PersonForm = ({ newName, handleNewName, newNumber, handleNewNumber, handleSubmit }) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button onClick={handleSubmit} type="submit">add</button>
      </div>
    </form>
    )
}

const Filter = ({ searchText, handleSearchText }) => {
  return (
    <div>
      filter shown with <input value={searchText} onChange={handleSearchText} />
    </div>
  )
}

const Persons = ({ persons }) => {
  return persons.map((person) => (
    <p key={person.name}> {person.name} {person.number} </p>)
  )
} 

const App = () => {
  const baseUrl = "http://localhost:3001/persons"
  const [persons, setPersons] = useState([])
  
  useEffect(() => {
    axios.get(baseUrl)
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleSearchText = (event) => setSearchText(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, 
      number: newNumber
    }

    if (persons.every((person) => person.name !== newName)) {
      axios.post(baseUrl, personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName("")
        setNewNumber("")
      }).catch(error => {
        console.log("Something went wrong")
        console.log(error)
      })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const personsToShow = persons.filter(
    (person) => person.name.toLowerCase().includes(searchText.toLowerCase())
  )
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchText={searchText} handleSearchText={handleSearchText} />
      <h3>add a new</h3>
        <PersonForm newName={newName} handleNewName={handleNewName} 
                    newNumber={newNumber} handleNewNumber={handleNewNumber}
                    handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App