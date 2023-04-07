import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import counterReducer from '@/reducers/counterReducer'
import alertReducer from '@/reducers/alertReducer'
import App from './App'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    alert: alertReducer,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
