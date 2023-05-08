import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { configureStore } from '@reduxjs/toolkit'

import { useSelector, useDispatch } from 'react-redux'

import { Provider } from 'react-redux'
import counterReducer, {
  increment,
  decrement,
  zero,
} from '@/reducers/counterReducer'

import Counter from '@/components/Counter'

describe('<Counter />', () => {
  let store
  let user

  beforeEach(() => {
    // store = mockStore({ counter: 0, notification: {} })
    store = configureStore({ reducer: counterReducer })

    render(
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

    expect(store.getState()).toBe(1)
  })

  it('should dispatch decrement action when Minus button is clicked', async () => {
    const button = screen.getByText('Minus -')
    await user.click(button)

    expect(store.getState()).toBe(-1)
  })

  it('should dispatch zero action when Zero button is clicked', async () => {
    const addButton = screen.getByText('Plus +')
    await user.click(addButton)
    await user.click(addButton)
    await user.click(addButton)

    const button = screen.getByText('Zero')
    await user.click(button)

    expect(store.getState()).toBe(0)
  })
})
