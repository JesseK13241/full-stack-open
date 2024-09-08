const PersonForm = ({
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
  handleNewContact
}) => {
  return (
    <form>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={handleNewName}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={handleNewNumber}
        />
      </div>
      <div>
        <button
          onClick={handleNewContact}
          type="submit">
          add
        </button>
      </div>
    </form>
  )
}

export default PersonForm
