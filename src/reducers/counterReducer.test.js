import counterReducer, { increment, decrement, zero } from './counterReducer'

describe('counterReducer', () => {
  it('should return a proper initial state when called with undefined state', () => {
    const action = { type: 'DO_NOTHING' }
    const initialState = 0

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('should increment state by one when called with an increment action', () => {
    const action = increment()
    const initialState = 0

    const newState = counterReducer(initialState, action)
    expect(newState).toEqual(initialState + 1)
  })

  it('should decrement state by one when called with a decrement action', () => {
    const action = decrement()
    const initialState = 0

    const newState = counterReducer(initialState, action)
    expect(newState).toEqual(initialState - 1)
  })

  it('should reset state to zero when called with a zero action', () => {
    const action = zero()
    const initialState = 5

    const newState = counterReducer(initialState, action)
    expect(newState).toEqual(0)
  })
})
