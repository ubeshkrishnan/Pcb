import { configureStore } from '@reduxjs/toolkit'
import counterReducer  from "../src/store/Reviewstore"

export const store = configureStore({
  reducer: {
    couter:counterReducer ,
},
})