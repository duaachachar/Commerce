import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Slices/Add-cart/addCartSlice'

export const Store = configureStore({
    reducer:{
        counter : counterReducer,
    }
})