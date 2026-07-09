import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name : "User",
    initialState : {
        email : "",
        password : "",
        isLoggedIn : false,
        name : "Udayan"
    },
    reducers : {
        inUser : (state , action) => {
            state.email = action.payload.email,
            state.password = action.payload.password,
            state.isLoggedIn = true
        },
        outUser : (state , action) => {
            state.email = "",
            state.password = "",
            state.isLoggedIn = false
        }
    }
});

export const { inUser , outUser } = UserSlice.actions;
export default UserSlice.reducer;