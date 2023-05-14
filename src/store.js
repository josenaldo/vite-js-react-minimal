import { configureStore } from '@reduxjs/toolkit'

import { counterReducer } from '@/features/counter'
import { alertReducer } from '@/features/alert'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    alert: alertReducer,
  },
})

export default store
