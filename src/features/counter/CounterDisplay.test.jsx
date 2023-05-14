import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import CounterDisplay from './CounterDisplay'

const mockStore = configureStore([])

describe('CounterDisplay', () => {
  let store

  beforeEach(() => {
    store = mockStore({
      counter: 5,
    })
  })

  it('renders the counter value from the store', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CounterDisplay />
      </Provider>
    )

    expect(getByText('5')).toBeInTheDocument()
  })

  it('renders 0 when the counter value is not set', () => {
    store = mockStore({
      counter: null,
    })

    const { getByText } = render(
      <Provider store={store}>
        <CounterDisplay />
      </Provider>
    )

    expect(getByText('0')).toBeInTheDocument()
  })
})
