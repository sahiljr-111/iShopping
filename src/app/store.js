import { configureStore } from '@reduxjs/toolkit'
import addCart from './reducer/addCart'

export const store = configureStore({
  reducer: {
    addcart : addCart
  },
})