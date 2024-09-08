import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { 
    content, 
    votes: 0, 
    id: (Math.random() * 1000000).toFixed(0).toString()
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const increaseVote = async (id, currentVotes) => {
  const response = await axios.patch(`${baseUrl}/${id}`, {votes: currentVotes + 1})
  return response.data
}

export default {
  getAll,
  createNew,
  increaseVote
}