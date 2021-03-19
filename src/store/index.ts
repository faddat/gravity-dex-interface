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
        },
        walletStatus: 'normal' // normal, pending, error
    },
    //헬퍼 함수 하나 빼서 getPool(a, b) pair 하나씩 넣고 안에서 알파벳 순으로 솔팅 돌리고 하면 될듯
    poolsData: {
        pairs: ['atom', 'iris', 'band', 'luna', 'kava'],
        pools: {
            "atom-iris": { atom: 1000, iris: 1003 },
            "atom-band": { atom: 871.123, band: 111.31221 },
            "band-luna": { band: 233333, luna: 12234.23124 }
        }
    }
}

export const RootReducer = createSlice({
    name: "rootStore",
    initialState: TEST_INIT_DATA,
    reducers: {
        setStatusPending: (state, action) => {
            console.log(state)
            state.userData.walletStatus = 'pending'
        }
    },
});

const reducer = combineReducers({ store: RootReducer.reducer });

export default configureStore({
    reducer
});