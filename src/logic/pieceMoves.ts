import { Drag } from "../types/types";

const pieceMoves = (
  drag: Drag,
  pieceColor: string | undefined,
  cellIndex: number,
  rowIndex: number
) => {
  const initRow = drag.dragStartCoordinates[0];
  const initCell = drag.dragStartCoordinates[1];
  const initType = drag.type;
  const initPieceColor = drag.color;

  if (initPieceColor !== pieceColor) {
    if (initType === "pawn") {
      if (initCell === cellIndex) {
        if (
          (initPieceColor === "white" && initRow < rowIndex) ||
          (initPieceColor === "black" && initRow > rowIndex)
        ) {
          return true;
        }
      }
    } else if (initType === "king") {
      if (
        Math.abs(initRow - rowIndex) <= 1 &&
        Math.abs(initCell - cellIndex) <= 1
      ) {
        return true;
      }
    } else if (initType === "queen") {
      if (
        initRow === rowIndex ||
        initCell === cellIndex ||
        Math.abs(initRow - rowIndex) === Math.abs(initCell - cellIndex)
      ) {
        return true;
      }
    } else if (initType === "rook") {
      if (initRow === rowIndex || initCell === cellIndex) {
        return true;
      }
    } else if (initType === "bishop") {
      if (Math.abs(initRow - rowIndex) === Math.abs(initCell - cellIndex)) {
        return true;
      }
    } else if (initType === "knight") {
      if (
        (Math.abs(initRow - rowIndex) === 2 &&
          Math.abs(initCell - cellIndex) === 1) ||
        (Math.abs(initCell - cellIndex) === 2 && Math.abs(initRow - rowIndex))
      ) {
        return true;
      }
    }
    return false;
  }
};

export default pieceMoves;
