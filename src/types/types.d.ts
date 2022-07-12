export interface Store {
  cellReducer: CellType[][];
  dragReducer: Drag;
  kingRookTrackerReducer: KingRookTracker;
  moveTurnReducer: MoveTurn;
  fastPawnReducer: FastPawn;
  checkReducer: Check;
}

export interface FastPawn {
  pawnRow: number;
  pawnCell: number;
  pawnColor: string;
}

export interface Check {
  check: boolean;
  threatPaths: number[][];
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

export interface CellReducerAction {
  type: string;
  payload: {
    cellGiverRowNumber: number;
    cellGiverCellNumber: number;
    cellTakerRowNumber: number;
    cellTakerCellNumber: number;
    cellGiverPieceColor: string;
    cellGiverPieceType: string;
    track: KingRookTracker;
  };
}

export interface CheckReducerAction {
  type: string;
  payload: number[][];
}

export interface DragReducerAction {
  type: string;
  payload: { dragPosition: [number, number]; type: string; color: string };
}

export interface FastPawnReducerAction {
  type: string;
  payload: { rowIndex: number; cellIndex: number; pieceColor: string };
}

export interface KingRookTrackerReducerAction {
  type: string;
  payload: {
    initialCellIndex: number;
    initialRowIndex: number;
    pieceType: string;
    pieceColor: string;
  };
}

export interface MoveTurnReducerAction {
  type: string;
}

export interface PieceInfo {
  rowNumber: number;
  cellNumber: number;
  type: string;
}
