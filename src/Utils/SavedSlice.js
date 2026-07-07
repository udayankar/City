import { createSlice } from "@reduxjs/toolkit";

const SavedSlice = createSlice({
    name : "Saved",
    initialState : [],
    reducers : {
        addItem : (state , action) => {
            state.push(action.payload)
        },
        removeItem : (state , action) => {
            state.pop()
        },
        clearItem : (state , action) => {
            state.length = 0
        }
    }
});

export const { addItem , removeItem , clearItem} = SavedSlice.actions;
export default SavedSlice.reducer; 