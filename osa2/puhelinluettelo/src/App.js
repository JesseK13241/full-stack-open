import { useState, useEffect } from 'react'
import contactService from './services/contactService'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  
  useEffect(() => {
    contactService.getAllContacts()
    .then(data => {
      setPersons(data)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleSearchText = (event) => setSearchText(event.target.value)

  const handleNewContact = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, 
      number: newNumber
    }

    if (persons.every((person) => person.name !== newName)) {
      contactService.createContact(personObject)
      .then(data => {
        setPersons(persons.concat(data))
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

  const deleteContact = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      contactService.deleteContact(personToDelete.id).then(
        response => {
          if (response.status === 200) {
            console.log(`${personToDelete.name} deleted`)
          }
          setPersons(persons.filter(
            person => person.id !== personToDelete.id
          ))
        } 
      )
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
                    handleNewContact={handleNewContact} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deleteContact={deleteContact} />
    </div>
  )
}

export default App