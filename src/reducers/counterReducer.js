/**
 * A reducer function that handles counting actions.
 * @function
 * @param {number} state - The current count state.
 * @param {Object} action - An object that describes the action to be performed on the state.
 * @param {string} action.type - The action type. Must be either 'INCREMENT', 'DECREMENT', or 'ZERO'.
 * @returns {number} The new state value after applying the action.
 */
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

/**
 * A function that returns an action object to decrement the count state.
 * @function
 * @returns {Object} The decrement action object.
 */
const decrement = () => {
  return {
    type: 'DECREMENT',
  }
}

/**
 * A function that returns an action object to reset the count state to zero.
 * @function
 * @returns {Object} The zero action object.
 */
const zero = () => {
  return {
    type: 'ZERO',
  }
}

/**
 * A function that returns an action object to increment the count state.
 * @function
 * @returns {Object} The increment action object.
 */
const increment = () => {
  return {
    type: 'INCREMENT',
  }
}

export { decrement, zero, increment }
export default counterReducer
