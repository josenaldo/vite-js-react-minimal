import React from 'react'
import './App.css'

function App() {
  return (
    <div className="container">
      <main>
        <h1>My new App</h1>
        <article>
          <h2>Subtitle</h2>
          <div className="grid">
            <button onClick={() => console.log('Test')}>Action</button>
          </div>
        </article>
      </main>
    </div>
  )
}

export default App
