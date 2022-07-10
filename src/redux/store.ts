import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cellReducer from "./reducers/cellReducer";
import dragReducer from "./reducers/dragReducer";
import kingRookTrackerReducer from "./reducers/kingRookTrackerReducer";
import moveTurnReducer from "./reducers/moveTurnReducer";
import fastPawnReducer from "./reducers/fastPawnReducer";
import checkReducer from "./reducers/checkReducer";

const reducer = combineReducers({
  cellReducer,
  dragReducer,
  kingRookTrackerReducer,
  moveTurnReducer,
  fastPawnReducer,
  checkReducer,
});

const store = configureStore({ reducer: reducer });

export default store;
