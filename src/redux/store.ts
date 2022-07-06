import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cellReducer from "./reducers/cellReducer";
import dragReducer from "./reducers/dragReducer";


const reducer = combineReducers({
    cellReducer,
    dragReducer
});


const store = configureStore({ reducer: reducer });


export default store;


