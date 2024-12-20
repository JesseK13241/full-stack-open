import axios from "axios"
const baseUrl = "http://localhost:3001/api/persons"

const getAllContacts = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createContact = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => {
    console.log(response)
    return response.data
  })
}

const updateContact = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteContact = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response)
}

export default { getAllContacts, createContact, updateContact, deleteContact }
