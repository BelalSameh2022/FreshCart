import { createSlice } from "@reduxjs/toolkit";

let initialState = { counter: 0, userName: '' }

let counterSlice = createSlice({
    name: "counterSlice",
    initialState,
    reducers: {
        increase: (state) => {
            state.counter += 1;
        },
        decrease: (state) => {
            state.counter -= 1;
        },
        increaseByAmount: (state, action) => {
            console.log(action);
            state.counter += action.payload;
        }
    }
});

export let counterReducer = counterSlice.reducer;
export let { increase, decrease, increaseByAmount } = counterSlice.actions;