import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cellReducer from "./reducers/cellReducer";


const reducer = combineReducers({
    cellReducer
});


const store = configureStore({ reducer: reducer });


export default store;


