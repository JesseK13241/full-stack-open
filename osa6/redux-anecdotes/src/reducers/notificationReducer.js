import { createSlice } from '@reduxjs/toolkit'

const initialState = "Initial notification"

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationMessage(state, action) {
      return action.payload
    },
    clearNotification() {
      return ""
    }
  },
})

export const { setNotificationMessage, clearNotification } = notificationSlice.actions

export const setNotification = (message, duration) => {
  return async (dispatch) => {
    dispatch(setNotificationMessage(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer