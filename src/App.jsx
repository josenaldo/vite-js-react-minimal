import React from 'react'
import { useSelector } from 'react-redux'

import Counter from '@/components/Counter'
import Togglable from '@/components/Togglable'
import Alert from '@/components/Alert'
import { ALERT_TYPE } from '@/components/Alert'

import './App.css'

function App() {
  const counter = useSelector((state) => state)

  const [message, setMessage] = React.useState(null)

  const showMessage = () => {
    let type = null

    if (counter === 0) {
      type = ALERT_TYPE.INFO
    }

    if (counter > 0) {
      type = ALERT_TYPE.SUCCESS
    }

    if (counter < 0) {
      type = ALERT_TYPE.ERROR
    }

    setMessage({
      type,
      content: `Counter is now ${counter}`,
    })
  }

  const hideMessage = () => {
    setMessage(null)
  }

  React.useEffect(() => {
    showMessage()
  }, [counter])

  return (
    <div className="container">
      <main>
        <Alert message={message} setMessage={hideMessage} />

        <h1>Counter</h1>

        <Togglable buttonLabel="Open">
          <Counter />
        </Togglable>
      </main>
    </div>
  )
}

export default App
