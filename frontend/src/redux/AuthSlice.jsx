import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/es/storage/session'


export const AuthSlice = createSlice({
    name: 'auth',
    initialState:{
        user:null,
    },

    reducers:{

        setUser:(state,action)=>{
            state.user = action.payload
        },
    }
})

export const {setUser} = AuthSlice.actions
const persistConfig = {
    key:"auth",
    storage:sessionStorage
}

export const persistedReducer = persistReducer(persistConfig,AuthSlice.reducer)
export default persistedReducer;

