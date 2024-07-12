/* eslint-disable no-case-declarations */

import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
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

export const { increaseVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const voteAnecdote = (id, currentVotes) => {
  return async (dispatch) => {
    dispatch(increaseVote(id))
    await anecdoteService.increaseVote(id, currentVotes)
    dispatch(setNotification(`Voted for anecdote with id: ${id}`, 5))
  }
}

export const initializeAnecdotes = () => {  
  return async dispatch => {    
    const notes = await anecdoteService.getAll()    
    dispatch(setAnecdotes(notes))  
  }
}

export const createAnecdote = content => {  
  return async dispatch => {    
    const newNote = await anecdoteService.createNew(content)    
    dispatch(appendAnecdote(newNote))
    dispatch(setNotification(`Created anecdote: ${content}`, 5))
  }
}

export default anecdoteSlice.reducer