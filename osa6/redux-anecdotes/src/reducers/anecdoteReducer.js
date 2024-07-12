/* eslint-disable no-case-declarations */

import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    increaseVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {     
       return action.payload    
      }
  },
})

export const { createAnecdote, increaseVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    dispatch(increaseVote(id))
    dispatch(setNotification(`Voted for anecdote with id: ${id}`, 5000))
  }
}

export default anecdoteSlice.reducer