import React from 'react'

import Togglable from '@/components/Togglable'
import Alert from '@/components/Alert'
import { ALERT_TYPE } from '@/components/Alert'

import './App.css'

function App() {
  const [message, setMessage] = React.useState(null)

  const showMessage = () => {
    setMessage({
      type: ALERT_TYPE.SUCCESS,
      content: 'This is a success message',
    })
  }

  const hideMessage = () => {
    setMessage(null)
  }

  return (
    <div className="container">
      <main>
        <Alert message={message} setMessage={hideMessage} />

        <h1>My new App</h1>
        <Togglable buttonLabel="Open">
          <h2>Subtitle</h2>
          <div className="grid">
            <button onClick={showMessage}>Action</button>
          </div>
        </Togglable>
      </main>
    </div>
  )
}

export default App
