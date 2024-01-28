import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/user'

const store = configureStore({
  reducer: {
    userState: userReducer,
  },
})

export default store