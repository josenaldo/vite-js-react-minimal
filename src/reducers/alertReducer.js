import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const NO_ALERT_STATE = {
  message: null,
  type: null,
  timeoutId: null,
}

const ALERT_TIMEOUT = 5
const ALERT_TYPES = {
  SUCCESS: 'alert-success',
  INFO: 'alert-info',
  WARNING: 'alert-warning',
  ERROR: 'alert-error',
}

const setAlert = createAsyncThunk(
  'alert/setAlert',
  async (
    { message, type = ALERT_TYPES.INFO, timeoutInSeconds = ALERT_TIMEOUT },
    thunkAPI
  ) => {
    const { dispatch, getState } = thunkAPI
    const { alert } = getState()

    if (alert.timeoutId) {
      clearTimeout(alert.timeoutId)
    }

    const timeoutId = setTimeout(() => {
      dispatch({ type: 'alert/removeAlert' })
    }, timeoutInSeconds * 1000)

    return {
      message: message,
      type: type,
      timeoutId: timeoutId,
    }
  }
)

const alertSlice = createSlice({
  name: 'alert',
  initialState: NO_ALERT_STATE,
  reducers: {
    removeAlert: (state) => {
      clearTimeout(state.timeoutId)
      return NO_ALERT_STATE
    },
  },
  extraReducers: {
    [setAlert.fulfilled]: (state, action) => {
      return action.payload
    },
  },
})

export { ALERT_TYPES, setAlert }
export const { removeAlert } = alertSlice.actions
export default alertSlice.reducer
