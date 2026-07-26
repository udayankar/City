import { createSlice } from "@reduxjs/toolkit";

const SavedSlice = createSlice({
    name: "Saved",
    initialState: [],
    reducers: {
        addItem: (state, action) => {
            if (!state.includes(action.payload)) {
                state.push(action.payload);
            }
        },
        removeItem: (state, action) => {
            return state.filter(id => id !== action.payload);
        },
        clearItem: () => {
            return [];
        },
        setItems: (state, action) => {
            return action.payload;
        }
    }
});

export const {addItem , removeItem , clearItem , setItems} = SavedSlice.actions;
export default SavedSlice.reducer; 