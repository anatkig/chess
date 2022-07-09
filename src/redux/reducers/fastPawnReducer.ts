const fastPawn = {
  pawnRow: null,
  pawnCell: null,
  pawnColor: "",
};

const fastPawnReducer = (state = fastPawn, action: any) => {
  switch (action.type) {
    case "NEW_FAST_PAWN":
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
