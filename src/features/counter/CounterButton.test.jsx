import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { CounterButton, counterReducer, increment } from '@/features/counter'
import { alertReducer, ALERT_TYPES } from '@/features/alert'

const rootReducer = combineReducers({
  alert: alertReducer,
  counter: counterReducer,
})

describe('<CounterButton />', () => {
  let store
  let user

  beforeEach(() => {
    store = configureStore({ reducer: rootReducer })
    user = userEvent.setup()
  })

  it('dispatches action when button is clicked', async () => {
    const message = 'Counter incremented!'
    const text = 'Increment'
    const className = 'test-class'

    const { getByText } = render(
      <Provider store={store}>
        <CounterButton
          action={increment}
          message={message}
          text={text}
          className={className}
        />
      </Provider>
    )

    const button = getByText(text)
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass(className)

    await user.click(button)

    const state = store.getState()
    expect(state.counter).toBe(1)
    expect(state.alert).toEqual({
      message,
      type: ALERT_TYPES.SUCCESS,
      timeoutId: expect.any(Number),
      details: null,
      error: null,
    })
  })
})
