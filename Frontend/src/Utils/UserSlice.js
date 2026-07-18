import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name : "User",
    initialState : {
        email : "",
        isLoggedIn : false,
        name : "User"
    },
    reducers : {
        inUser : (state , action) => {
            state.email = action.payload.email,
            state.isLoggedIn = true,
            state.name = action.payload.name
        },
        outUser : (state , action) => {
            state.email = "",
            state.isLoggedIn = false,
            state.name = "User"
        }
    }
});

export const { inUser , outUser } = UserSlice.actions;
export default UserSlice.reducer;