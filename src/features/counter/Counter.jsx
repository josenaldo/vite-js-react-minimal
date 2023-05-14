import React from 'react'

import { increment, decrement, zero } from '@/features/counter'

import { CounterButton, CounterDisplay } from '@/features/counter'

import './Counter.css'

/**
 * A counter component that increments and decrements a number
 * @function
 * @returns {JSX.Element} - The Counter component
 */
const Counter = () => {
  return (
    <div>
      <h2>Click for count!</h2>
      <CounterDisplay />

      <div className="grid">
        <CounterButton
          action={decrement}
          message="Counter decremented"
          text="Minus -"
          className="danger"
        />
        <CounterButton
          action={zero}
          message="Counter reset to zero"
          text="Zero"
          className="info"
        />
        <CounterButton
          action={increment}
          message="Counter incremented"
          text="Plus +"
          className="success"
        />
      </div>
    </div>
  )
}

export default Counter
