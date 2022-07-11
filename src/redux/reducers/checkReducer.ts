import { CheckReducerAction } from "../../types/types";

const checkInfo = {
  check: false,
  threatPaths: [],
};

const checkReducer = (state = checkInfo, action: CheckReducerAction) => {
  switch (action.type) {
    case "SET_CHECK":
      return {
        ...state,
        check: true,
        threatPaths: [...action.payload],
      };
    case "UNSET_CHECK":
      return {
        ...state,
        check: false,
        threatPath: [],
      };
    default:
      return state;
  }
};

export default checkReducer;
