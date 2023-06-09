import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const addCart = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("Store ", action.payload);
      const find = state.find((item)=>item.id === action.payload.id);
      if(find){
        return state.map((item)=>item.id === action.payload.id ? {...item, qty: item.qty+1, total:item.total+item.price}:item)
      } else {
        state.push(action.payload)
        action.payload.qty = 1;
        action.payload.total = action.payload.price;
      }
    },
    removeCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    incQty: (state, action) => {
      state.map((item) => {
        if (item.id === action.payload.id) {
          return item.total = (item.qty += 1) * item.price
          // return item.qty += 1;
        }
        return state
      })
    },
    decQty: (state, action) => {
      state.map((item) => {
        if (item.id === action.payload.id) {
          if (item.qty > 1) {
            return item.total = (item.qty -= 1) * item.price
            // return item.qty -= 1;
          }
        }
        return state
      })
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeCart, incQty, decQty, incrementByAmount } = addCart.actions

export default addCart.reducer