import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleSearchText = (event) => setSearchText(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.every((person) => person.name !== newName)) {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName("")
      setNewNumber("")
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