const moveTurn = {
  turn: true,
};

const moveTurnReducer = (state = moveTurn, action: any) => {
  switch (action.type) {
    case "BLACK_MOVE":
      return {
        ...moveTurn,
        turn: false,
      };
    case "WHITE_MOVE":
      return {
        ...moveTurn,
        turn: true,
      };
    default:
      return state;
  }
};

export default moveTurnReducer;
