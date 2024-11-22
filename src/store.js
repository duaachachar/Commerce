import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Slices/Add-cart/addCartSlice'
import productSlice from './Slices/products/productSlice'

export const Store = configureStore({
    reducer:{
        counter : counterReducer,
        products : productSlice,
    }
})