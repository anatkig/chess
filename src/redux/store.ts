import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cellReducer from "./reducers/cells";


const reducer = combineReducers({
    cellReducer
});

const initialState = {};

const store = configureStore({ reducer: reducer, preloadedState: initialState });


export default store;


