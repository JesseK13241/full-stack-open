import { createSlice } from '@reduxjs/toolkit'

const initialState = "Initial notification"

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      displayNotification(state, action) {
        return action.payload
      }
    },
  })

export const { displayNotification: filterChange } = notificationSlice.actions
export default notificationSlice.reducer