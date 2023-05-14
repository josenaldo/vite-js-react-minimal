import React from 'react'

import { Togglable } from '@/features/ui'
import { Alert } from '@/features/alert'
import { Counter } from '@/features/counter'

import './App.css'

const App = () => {
  return (
    <div className="container">
      <main>
        <Alert />

        <h1>Counter</h1>

        <Togglable buttonLabel="Open">
          <Counter />
        </Togglable>
      </main>
    </div>
  )
}

export default App
