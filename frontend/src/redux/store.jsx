import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";


const userpersistConfig = {
    key:"auth",
    storage:sessionStorage
}   


const persistconfiguser = persistReducer(userpersistConfig,AuthReducer)

const rootReducer = combineReducers({auth:persistconfiguser})
export const store =configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
    
})

export const persistor = persistStore(store)