import { configureStore } from '@reduxjs/toolkit'
import productListSlice  from "./product/productListSlice"


export const store = configureStore({
    reducer: {
        productList: productListSlice,
      
    }
})

