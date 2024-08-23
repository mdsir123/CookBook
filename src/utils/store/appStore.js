import {configureStore} from '@reduxjs/toolkit'
import WishReducer from './WishSlice'
import FavoritesReducer from './FavoritesSlice'

let appStore = configureStore({
    reducer : {
        wish : WishReducer,
        favorites : FavoritesReducer, 
    }
})

export default appStore