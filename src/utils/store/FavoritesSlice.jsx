import { createSlice } from "@reduxjs/toolkit";

const FavoritesSlice = createSlice({
    name : 'favorites',
    initialState : {
        items : []
    },
    reducers : {
        addFavorite : (state, action) =>{
            let data = action.payload;
            let FavoriteObj = {objData : data}
            state.items.push(FavoriteObj)
        },
        removeFavorite : (state, action) =>{
            let id = action.payload
            let objIdx = state.items.findIndex((FavoriteObj)=>FavoriteObj.objData.id == id)
            state.items.splice(objIdx,1 )
        },
        clearFavorite : (state, action) =>{
            state.items.length = 0
        }
    }
})

export const {addFavorite, removeFavorite, clearFavorite} = FavoritesSlice.actions

export default FavoritesSlice.reducer