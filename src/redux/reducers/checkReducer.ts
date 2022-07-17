import { CheckReducerAction } from "../../types/types";
import { SET_CHECK, UNSET_CHECK, SET_MATE } from "../../constants/constants";

const checkInfo = {
  check: false,
  mate: false,
  threatPaths: [],
};

const checkReducer = (state = checkInfo, action: CheckReducerAction) => {
  switch (action.type) {
    case SET_CHECK:
      return {
        ...state,
        check: true,
        threatPaths: [...action.payload],
      };
    case UNSET_CHECK:
      return {
        ...state,
        check: false,
        threatPath: [],
      };
    case SET_MATE:
      return { ...state, mate: true };
    default:
      return state;
  }
};

export default checkReducer;
