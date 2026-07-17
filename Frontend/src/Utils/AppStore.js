import { configureStore } from "@reduxjs/toolkit";
import SavedReducer from "./SavedSlice" 
import UserReducer from "./UserSlice"

const AppStore = configureStore({
    reducer : {
        Saved : SavedReducer,
        User : UserReducer
    }
});

export default AppStore;