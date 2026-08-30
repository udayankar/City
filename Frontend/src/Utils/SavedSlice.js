import { createSlice } from "@reduxjs/toolkit";

const SavedSlice = createSlice({
    name: "Saved",
    initialState: {
        posts: [],
        events: []
    },

    reducers: {
        addPost: (state, action) => {
            if (!state.posts.includes(action.payload)) {
                state.posts.push(action.payload);
            }
        },

        removePost: (state, action) => {
            state.posts = state.posts.filter(id => id !== action.payload);
        },

        addEvent: (state, action) => {
            if (!state.events.includes(action.payload)) {
                state.events.push(action.payload);
            }
        },

        removeEvent: (state, action) => {
            state.events = state.events.filter(id => id !== action.payload);
        },

        clearItems: (state) => {
            state.posts = [];
            state.events = [];
        },

        setItems: (state, action) => {
            state.posts = action.payload.posts || [];
            state.events = action.payload.events || [];
        }
    }
});

export const {addPost , removePost , addEvent , removeEvent , clearItems , setItems} = SavedSlice.actions;

export default SavedSlice.reducer;