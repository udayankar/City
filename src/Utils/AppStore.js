import { configureStore } from "@reduxjs/toolkit";
import SavedReducer from "./SavedSlice" 

const AppStore = configureStore({
    reducer : {
        Saved : SavedReducer,
    }
});

export default AppStore;