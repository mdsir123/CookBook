import { createSlice } from "@reduxjs/toolkit";

const WishSlice = createSlice({
    name : 'wish',
    initialState : {
        items : []
    },
    reducers : {
        addWish : (state, action) =>{
            let data = action.payload;
            let WishObj = {objData : data, quantity : 1}
            conso
            state.items.push(WishObj)
        },
        removeWish : (state, action) =>{
            let id = action.payload
            let objIdx = state.items.findIndex((WishObj)=>WishObj.objData.id == id)
            state.items.splice(objIdx,1 )
        },
        clearWish : (state, action) =>{
            state.items.length = 0
        }
    }
})

export const {addWish, removeWish, clearWish} = WishSlice.actions

export default WishSlice.reducer