import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  location:{
   
  }
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state,action) => {
      // console.log(state,"sttate")
      // console.log(action,"action")
      state.value = action.payload + state.value
    },
    
    updateLocation:(state,action)=>{
      console.log(action.payload,"update data")
   state.location=action.payload
    },
    resetLocation:(state,action)=>{
      state.location ={
        latitude: '',
        longitude: '',
        currentTime: ''
      }
    },

    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },

  },
})


export const { increment, decrement, incrementByAmount,updateLocation } = counterSlice.actions

export default counterSlice.reducer