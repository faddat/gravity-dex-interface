import {
    combineReducers,
    configureStore,
    createSlice
} from "@reduxjs/toolkit";

//TEST DATA
const TEST_INIT_DATA = {
    userData: {
        balance: {
            atom: 100,
            iris: 200,
            kava: 300,
            luna: 400,
            band: 500,
        }
    },
    poolData: {

    }
}


export const RootReducer = createSlice({
    name: "todoList",
    initialState: TEST_INIT_DATA,
    reducers: {},
});

const reducer = combineReducers({ store: RootReducer.reducer });

export default configureStore({
    reducer
});