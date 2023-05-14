import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { ALERT_TYPES } from '@/features/alert'
import { handleAxiosError } from './alert-utils'

const NO_ALERT_STATE = {
  type: null,
  message: null,
  details: null,
  error: null,
  timeoutId: null,
}

const ALERT_TIMEOUT = 5

const ERROR_ALERT_TIMEOUT = 15

/**
 * Sets an alert with the given type, message, and optional details.
 *
 * @async
 * @function setAlert
 * @param {Object} payload - The alert payload.
 * @param {string} payload.type - The type of the alert.
 * @param {string} payload.message - The message to display in the alert.
 * @param {string} [payload.details] - Optional details to display in the alert.
 * @param {Error} [payload.error] - Optional error object to include in the alert.
 * @param {number} [payload.timeoutInSeconds=5] - Optional timeout in seconds for the alert.
 * @returns {Promise<Object>} A promise that resolves with the alert object when the alert has been set.
 */
const setAlert = createAsyncThunk(
  'alert/setAlert',
  async (
    {
      type = ALERT_TYPES.INFO,
      message,
      details = null,
      error = null,
      timeoutInSeconds = ALERT_TIMEOUT,
    },
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
      details: details,
      error: error,
      timeoutId: timeoutId,
    }
  }
)

/**
 * Sets an error alert with the given message, optional details, and error object.
 *
 * @async
 * @function setErrorAlert
 * @param {Object} payload - The alert payload.
 * @param {string} payload.message - The message to display in the alert.
 * @param {string} [payload.details] - Optional details to display in the alert.
 * @param {Error} payload.error - The error object to include in the alert.
 * @param {number} [payload.timeoutInSeconds=15] - Optional timeout in seconds for the alert.
 * @returns {Promise<Object>} A promise that resolves with the alert object when the alert has been set.
 */
const setErrorAlert = createAsyncThunk(
  'alert/setErrorAlert',
  async (
    { message, details = null, error, timeoutInSeconds = ERROR_ALERT_TIMEOUT },
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

    const newAlert = handleAxiosError(error, message, details)
    newAlert.timeoutId = timeoutId

    return newAlert
  }
)

/**
 * Redux slice for managing alerts.
 *
 * @typedef {Object} AlertState
 * @property {string} message - The message to display in the alert.
 * @property {string} type - The type of the alert (e.g. 'info', 'warning', 'error').
 * @property {string} [details] - Optional details to display in the alert.
 * @property {Error} [error] - Optional error object to include in the alert.
 * @property {number} [timeoutId] - Optional ID of the timeout for the alert.
 *
 * @type {import('@reduxjs/toolkit').Slice<AlertState>}
 */
const alertSlice = createSlice({
  name: 'alert',
  initialState: NO_ALERT_STATE,
  reducers: {
    /**
     * Action creator for removing the current alert.
     *
     * @function removeAlert
     * @param {AlertState} state - The current alert state.
     * @returns {Object} The action object to dispatch.
     */
    removeAlert: (state) => {
      clearTimeout(state.timeoutId)
      return NO_ALERT_STATE
    },
  },
  extraReducers: {
    [setAlert.fulfilled]: (state, action) => {
      return action.payload
    },
    [setErrorAlert.fulfilled]: (state, action) => {
      return action.payload
    },
  },
})

export { setAlert, setErrorAlert }
export const { removeAlert } = alertSlice.actions
export default alertSlice.reducer
