import { useState } from 'react'

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

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(searchText.toLowerCase()))
  const personElements = personsToShow.map((person) => (
    <p key={person.name}> {person.name} {person.number} </p>)
  )

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input value={searchText} onChange={handleSearchText} />
        </div>
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      {personElements}
    </div>
  )

}

export default App