import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { counterReducer, Counter } from '@/features/counter/'
import { alertReducer } from '@/features/alert'

describe('<Counter />', () => {
  let store
  let user
  let container

  const rootReducer = combineReducers({
    alert: alertReducer,
    counter: counterReducer,
  })

  beforeEach(() => {
    store = configureStore({ reducer: rootReducer })

    container = render(
      <Provider store={store}>
        <Counter />
      </Provider>
    ).container

    user = userEvent.setup()
  })

  it('should render buttons and count', () => {
    expect(screen.getByText('Click for count!')).toBeInTheDocument()
    expect(screen.getByText('Minus -')).toBeInTheDocument()
    expect(screen.getByText('Zero')).toBeInTheDocument()
    expect(screen.getByText('Plus +')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should dispatch increment action when Plus button is clicked', async () => {
    const button = screen.getByText('Plus +')
    await user.click(button)
    expect(store.getState().counter).toBe(1)

    const display = container.querySelector('.count')
    expect(display).toHaveTextContent('1')
  })

  it('should dispatch decrement action when Minus button is clicked', async () => {
    const button = screen.getByText('Minus -')
    await user.click(button)

    expect(store.getState().counter).toBe(-1)
    const display = container.querySelector('.count')
    expect(display).toHaveTextContent('-1')
  })

  it('should dispatch zero action when Zero button is clicked', async () => {
    const addButton = screen.getByText('Plus +')
    await user.click(addButton)
    await user.click(addButton)
    await user.click(addButton)

    const button = screen.getByText('Zero')
    await user.click(button)

    expect(store.getState().counter).toBe(0)
    const display = container.querySelector('.count')
    expect(display).toHaveTextContent('0')
  })
})
