export interface Store {
  cellReducer: CellType[][];
  dragReducer: Drag;
  kingRookTrackerReducer: KingRookTracker;
  moveTurnReducer: MoveTurn;
}

export interface MoveTurn {
  turn: boolean;
}

export interface KingRookTracker {
  whiteKing: boolean;
  blackKing: boolean;
  leftWhiteRook: boolean;
  rightWhiteRook: boolean;
  leftBlackRook: boolean;
  rightBlackRook: boolean;
}

export interface Drag {
  dragStartCoordinates: number[];
  type: string;
  color: string;
}

export interface CellType {
  backgroundColor: string;
  child: string;
}
