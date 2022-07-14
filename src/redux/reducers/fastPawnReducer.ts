import { FastPawnReducerAction } from "../../types/types";
import { NEW_FAST_PAWN } from "../../constants/constants";

const fastPawn = {
  pawnRow: null,
  pawnCell: null,
  pawnColor: "",
};

const fastPawnReducer = (state = fastPawn, action: FastPawnReducerAction) => {
  switch (action.type) {
    case NEW_FAST_PAWN:
      return {
        ...state,
        pawnRow: action.payload.rowIndex,
        pawnCell: action.payload.cellIndex,
        pawnColor: action.payload.pieceColor,
      };
    default:
      return state;
  }
};

export default fastPawnReducer;
