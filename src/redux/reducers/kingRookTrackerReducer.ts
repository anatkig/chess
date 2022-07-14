import { KingRookTrackerReducerAction } from "../../types/types";
import { KING_OR_ROOK_FIRST_MOVE } from "../../constants/constants";

const tracker = {
  whiteKing: true,
  leftWhiteRook: true,
  rightWhiteRook: true,
  blackKing: true,
  leftBlackRook: true,
  rightBlackRook: true,
};
// the reducer tracks whether kings or rooks have moved. This is necessary for castling
const kingRookTrackerReducer = (
  state = tracker,
  action: KingRookTrackerReducerAction
) => {
  switch (action.type) {
    case KING_OR_ROOK_FIRST_MOVE:
      const data = action.payload;

      if (data.pieceType === "king" && data.pieceColor === "white") {
        return {
          ...tracker,
          whiteKing: false,
        };
      } else if (data.pieceType === "king" && data.pieceColor === "black") {
        return {
          ...tracker,
          blackKing: false,
        };
      } else if (
        data.pieceType === "rook" &&
        data.initialRowIndex === 0 &&
        data.initialCellIndex === 7
      ) {
        return {
          ...tracker,
          rightWhiteRook: false,
        };
      } else if (
        data.pieceType === "rook" &&
        data.initialRowIndex === 0 &&
        data.initialCellIndex === 0
      ) {
        return {
          ...tracker,
          leftWhiteRook: false,
        };
      } else if (
        data.pieceType === "rook" &&
        data.initialRowIndex === 7 &&
        data.initialCellIndex === 7
      ) {
        return {
          ...tracker,
          rightBlackRook: false,
        };
      } else if (
        data.pieceType === "rook" &&
        data.initialRowIndex === 7 &&
        data.initialCellIndex === 0
      ) {
        return {
          ...tracker,
          leftBlackRook: false,
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};

export default kingRookTrackerReducer;
