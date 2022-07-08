import { Drag, CellType } from "../types/types";
import allowPawnMoves from "./allowPawnMoves";
import allowRookMoves from "./allowRookMoves";
import allowBishopMoves from "./allowBishopMoves";

const allowPieceMoves = (
  drag: Drag,
  pieceColor: string | undefined,
  cellIndex: number,
  rowIndex: number,
  cells: [CellType[]]
) => {
  const initRow = drag.dragStartCoordinates[0];
  const initCell = drag.dragStartCoordinates[1];
  const initType = drag.type;
  const initPieceColor = drag.color;

  if (initPieceColor !== pieceColor) {
    if (initType === "pawn") {
      return allowPawnMoves(
        cellIndex,
        initCell,
        rowIndex,
        initRow,
        initPieceColor,
        cells
      );
    } else if (initType === "king") {
      if (
        Math.abs(initRow - rowIndex) <= 1 &&
        Math.abs(initCell - cellIndex) <= 1
      ) {
        return true;
      }
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
};

export default allowPieceMoves;
