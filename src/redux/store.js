import { configureStore } from "@reduxjs/toolkit";
import muffinsReducer from './muffins';

const store = configureStore({
    reducer: {
        muffins: muffinsReducer
    }
})
// We replaced createStore, applyMiddleware, combineReducers, and redux-thunk with a single function, configureStore. This function wraps the Redux createStore, adds default configuration and provides additional functionality for configuring the store.
export default store;