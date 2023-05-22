import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

// import { NotificationContextProvider } from '@/features/notification'
import { Provider } from 'react-redux'
import store from '@/store'
import App from '@/pages/App'
import '@/styles/main.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    {/* <NotificationContextProvider> */}
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
    {/* </NotificationContextProvider> */}
  </React.StrictMode>
)
