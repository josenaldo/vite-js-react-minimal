import counterReducer, { increment, decrement, zero } from './counterReducer'

describe('counterReducer', () => {
  it('should return a proper initial state when called with undefined state', () => {
    const action = { type: 'DO_NOTHING' }
    const initialState = 0

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('should increment state by one when called with an increment action', () => {
    const initialState = 0

    const newState = counterReducer(initialState, increment())
    expect(newState).toEqual(initialState + 1)
  })

  it('should decrement state by one when called with a decrement action', () => {
    const initialState = 0

    const newState = counterReducer(initialState, decrement())
    expect(newState).toEqual(initialState - 1)
  })

  it('should reset state to zero when called with a zero action', () => {
    const initialState = 5

    const newState = counterReducer(initialState, zero())
    expect(newState).toEqual(0)
  })
})

describe('counter actions', () => {
  it('should return an action object with type "INCREMENT"', () => {
    const action = increment()
    expect(action.type).toEqual('INCREMENT')
    expect(action.payload).toEqual(undefined)
  })

  it('should return an action object with type "DECREMENT"', () => {
    const action = decrement()
    expect(action.type).toEqual('DECREMENT')
    expect(action.payload).toEqual(undefined)
  })

  it('should return an action object with type "ZERO"', () => {
    const action = zero()
    expect(action.type).toEqual('ZERO')
    expect(action.payload).toEqual(undefined)
  })
})
