import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import alertReducer, {
  setAlert,
  ALERT_TYPES,
  removeAlert,
} from '@/reducers/alertReducer'

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
      message: null,
      type: null,
      timeoutId: null,
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
          message: null,
          type: null,
          timeoutId: null,
        })
        resolve()
      }, timeoutInSeconds * 1000 + 100)
    })
  })
})
