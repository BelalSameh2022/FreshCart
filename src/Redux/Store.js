import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";


export let store = configureStore({
    reducer: {
        counter: counterReducer
    }
});