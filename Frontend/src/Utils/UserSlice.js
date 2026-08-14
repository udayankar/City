import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name : "User",
    initialState : {
        email : "",
        isLoggedIn : false,
        name : "User",
        bio : "",
        dp : ""
    },
    reducers : {
        inUser : (state , action) => {
            state.email = action.payload.email ?? state.email,
            state.isLoggedIn = true,
            state.name = action.payload.name ?? state.name,
            state.bio = action.payload.bio ?? state.bio,
            state.dp = action.payload.dp ?? state.dp
        },
        outUser : (state , action) => {
            state.email = "",
            state.isLoggedIn = false,
            state.name = "User",
            state.bio = "",
            state.dp = ""
        }
    }
});

export const { inUser , outUser } = UserSlice.actions;
export default UserSlice.reducer;