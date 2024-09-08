const Persons = ({ persons, deleteContact }) => {
  return persons.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}
      <button onClick={() => deleteContact(person)}>delete</button> 
    </div>
    )
  )
}
  
export default Persons