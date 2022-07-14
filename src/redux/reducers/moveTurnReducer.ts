import { MoveTurnReducerAction } from "../../types/types";
import { WHITE_MOVE, BLACK_MOVE } from "../../constants/constants";

const moveTurn = {
  turn: true,
};

const moveTurnReducer = (state = moveTurn, action: MoveTurnReducerAction) => {
  switch (action.type) {
    case BLACK_MOVE:
      return {
        ...moveTurn,
        turn: false,
      };
    case WHITE_MOVE:
      return {
        ...moveTurn,
        turn: true,
      };
    default:
      return state;
  }
};

export default moveTurnReducer;
