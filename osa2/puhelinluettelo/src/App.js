import { useState, useEffect } from 'react'
import contactService from './services/contactService'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import NotificationBox from './components/NotificationBox'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  
  useEffect(() => {
    contactService.getAllContacts()
    .then(data => {
      setPersons(data)
    })
  }, [])

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleSearchText = (event) => setSearchText(event.target.value)

  const handleNewContact = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, 
      number: newNumber
    }

    let duplicatePerson = persons.find(person => person.name === newName)
    if (duplicatePerson === undefined) {
      contactService.createContact(personObject)
      .then(data => {
        setPersons(persons.concat(data))
        setNotificationMessage(`Person '${newName}' added to contacts`)
        setTimeout(() => {setNotificationMessage(null)}, 5000)
      })
    } else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        contactService.updateContact(duplicatePerson.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setNotificationMessage(`Person '${newName}' updated`)
          setTimeout(() => {setNotificationMessage(null)}, 5000)
        })
    }
    setNewName("")
    setNewNumber("")
  }

  const deleteContact = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      contactService.deleteContact(personToDelete.id).then(
        response => {
          if (response.status === 200) {
            setNotificationMessage(`Person '${personToDelete.name}' deleted`)
            setTimeout(() => {setNotificationMessage(null)}, 5000)
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
      <NotificationBox message={notificationMessage} />
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