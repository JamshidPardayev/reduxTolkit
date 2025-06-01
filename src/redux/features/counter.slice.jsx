import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    inc: (state, action) => {
      state.value += action.payload
    },
    dec: (state, action) => {
      state.value -= action.payload
    },
    incByAmount: (state, action) => {
      state.value += action.payload
    },
    reset: (state) => {
      state.value = 0;
    }
  },
})

export const { inc, dec, incByAmount, reset } = counterSlice.actions

export default counterSlice.reducer