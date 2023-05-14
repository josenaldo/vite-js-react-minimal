import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import alertReducer, {
  setAlert,
  setErrorAlert,
  removeAlert,
} from '@/features/alert/alert-reducer'

import { ALERT_TYPES } from '@/features/alert'

const rootReducer = combineReducers({
  alert: alertReducer,
})

describe('alertSlice reducer', () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
    })
  })

  it('should set success alert', async () => {
    const message = 'Test alert message'
    const type = ALERT_TYPES.SUCCESS

    await store.dispatch(setAlert({ message, type }))
    const { alert } = store.getState()

    expect(alert.message).toEqual(message)
    expect(alert.type).toEqual(type)
    expect(alert.timeoutId).toEqual(expect.any(Number))
  })

  it('should set a default alert', async () => {
    const message = 'Test alert message'

    await store.dispatch(setAlert({ message }))
    const { alert } = store.getState()

    expect(alert.message).toEqual(message)
    expect(alert.type).toEqual(ALERT_TYPES.INFO)
    expect(alert.timeoutId).toEqual(expect.any(Number))
  })

  it('should set error alert', async () => {
    const message = 'Test alert message'
    const details = 'Test alert detail'
    const error = new Error(details)

    await store.dispatch(setErrorAlert({ message, details, error }))
    const { alert } = store.getState()

    expect(alert.message).toEqual(message)
    expect(alert.type).toEqual(ALERT_TYPES.ERROR)
    expect(alert.timeoutId).toEqual(expect.any(Number))
    expect(alert.details).toEqual(details)
    expect(alert.error).toEqual({
      errorMessage: 'Test alert detail',
    })
  })

  it('should remove alert', async () => {
    const message = 'Test alert message'
    const type = ALERT_TYPES.SUCCESS

    await store.dispatch(setAlert({ message, type }))

    const { alert } = store.getState()

    expect(alert.message).toEqual(message)
    expect(alert.type).toEqual(type)
    expect(alert.timeoutId).toEqual(expect.any(Number))

    store.dispatch(removeAlert())
    expect(store.getState().alert).toEqual({
      details: null,
      error: null,
      message: null,
      timeoutId: null,
      type: null,
    })
  })

  it('should auto-remove alert after timeout', async () => {
    const message = 'Test alert message'
    const type = ALERT_TYPES.SUCCESS
    const timeoutInSeconds = 2

    await store.dispatch(setAlert({ message, type, timeoutInSeconds }))

    const { alert } = store.getState()

    expect(alert.message).toEqual(message)
    expect(alert.type).toEqual(type)
    expect(alert.timeoutId).toEqual(expect.any(Number))

    return new Promise((resolve) => {
      setTimeout(() => {
        expect(store.getState().alert).toEqual({
          details: null,
          error: null,
          message: null,
          timeoutId: null,
          type: null,
        })
        resolve()
      }, timeoutInSeconds * 1000 + 100)
    })
  })
})
