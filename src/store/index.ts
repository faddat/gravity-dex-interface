import {
    combineReducers,
    configureStore,
    createSlice
} from "@reduxjs/toolkit";

export const todoReducer = createSlice({
    name: "todoList",
    initialState: { test: 'test' },
    reducers: {},
});

const reducer = combineReducers({ store: todoReducer.reducer });

export default configureStore({
    reducer
});