import React from 'react'

import { increment, decrement, zero } from '@/features/counter'

import { CounterButton, CounterDisplay } from '@/features/counter'
import { ALERT_TYPES } from '@/features/alert'

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
          type={ALERT_TYPES.ERROR}
          details="The counter was decremented by 1."
        />
        <CounterButton
          action={zero}
          message="Counter reset to zero"
          text="Zero"
          type={ALERT_TYPES.INFO}
          details="The counter was reset to zero."
        />
        <CounterButton
          action={increment}
          message="Counter incremented"
          text="Plus +"
          type={ALERT_TYPES.SUCCESS}
          details="The counter was incremented by 1."
        />
      </div>
    </div>
  )
}

export default Counter
