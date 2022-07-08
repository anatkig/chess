import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cellReducer from "./reducers/cellReducer";
import dragReducer from "./reducers/dragReducer";
import kingRookTrackerReducer from "./reducers/kingRookTrackerReducer";

const reducer = combineReducers({
  cellReducer,
  dragReducer,
  kingRookTrackerReducer,
});

const store = configureStore({ reducer: reducer });

export default store;
