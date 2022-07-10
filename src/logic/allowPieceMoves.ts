import { Drag, CellType, KingRookTracker, FastPawn } from "../types/types";
import allowPawnMoves from "./allowPawnMoves";
import allowRookMoves from "./allowRookMoves";
import allowBishopMoves from "./allowBishopMoves";
import allowKingMoves from "./allowKingMoves";

const allowPieceMoves = (
  drag: Drag,
  pieceColor: string | undefined,
  cellIndex: number,
  rowIndex: number,
  cells: CellType[][],
  track: KingRookTracker,
  turn: boolean,
  fastPawn: FastPawn,
  check: boolean,
  trackFastPawn: (
    rowIndex: number,
    cellIndex: number,
    pieceColor: string
  ) => void
) => {
  const initRow = drag.dragStartCoordinates[0];
  const initCell = drag.dragStartCoordinates[1];
  const initType = drag.type;
  const initPieceColor = drag.color;
  if (
    (initPieceColor === "black" && !turn) ||
    (initPieceColor === "white" && turn)
  ) {
    if (check === false || initType === "king") {
      if (initPieceColor !== pieceColor) {
        if (initType === "pawn") {
          return allowPawnMoves(
            cellIndex,
            initCell,
            rowIndex,
            initRow,
            initPieceColor,
            cells,
            fastPawn,
            trackFastPawn
          );
        } else if (initType === "king") {
          return allowKingMoves(
            initRow,
            rowIndex,
            initCell,
            cellIndex,
            cells,
            initPieceColor,
            track
          );
        } else if (initType === "queen") {
          // the queen, in essence, combines the rook and the bishop
          if (
            allowBishopMoves(
              initRow,
              rowIndex,
              initCell,
              cellIndex,
              cells,
              initPieceColor
            ) ||
            allowRookMoves(
              initRow,
              rowIndex,
              initCell,
              cellIndex,
              cells,
              initPieceColor
            )
          ) {
            return true;
          }
        } else if (initType === "rook") {
          return allowRookMoves(
            initRow,
            rowIndex,
            initCell,
            cellIndex,
            cells,
            initPieceColor
          );
        } else if (initType === "bishop") {
          return allowBishopMoves(
            initRow,
            rowIndex,
            initCell,
            cellIndex,
            cells,
            initPieceColor
          );
        } else if (initType === "knight") {
          if (
            (Math.abs(initRow - rowIndex) === 2 &&
              Math.abs(initCell - cellIndex) === 1) ||
            (Math.abs(initCell - cellIndex) === 2 &&
              Math.abs(initRow - rowIndex) === 1)
          ) {
            return true;
          }
        }
        return false;
      }
    }
  }
};

export default allowPieceMoves;
