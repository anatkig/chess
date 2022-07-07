import { Drag, CellType } from "../types/types";

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
      if (
        Math.abs(cellIndex - initCell) === 1 &&
        ((initPieceColor === "white" &&
          rowIndex - initRow === 1 &&
          cells[rowIndex][cellIndex].child.includes("black")) ||
          (initPieceColor === "black" &&
            initRow - rowIndex === 1 &&
            cells[rowIndex][cellIndex].child.includes("white")))
      ) {
        return true;
      } else if (initCell === cellIndex) {
        if (initPieceColor === "white") {
          if (
            initRow === 1 &&
            (rowIndex - initRow === 2 || rowIndex - initRow === 1) &&
            cells[rowIndex][cellIndex].child === "" &&
            cells[rowIndex - 1][cellIndex].child === ""
          ) {
            return true;
          } else if (
            rowIndex - initRow === 1 &&
            cells[rowIndex][cellIndex].child === ""
          ) {
            return true;
          }
        } else if (initPieceColor === "black") {
          if (
            initRow === 6 &&
            (initRow - rowIndex === 2 || initRow - rowIndex === 1) &&
            cells[rowIndex][cellIndex].child === "" &&
            cells[rowIndex + 1][cellIndex].child === ""
          ) {
            return true;
          } else if (
            initRow - rowIndex === 1 &&
            cells[rowIndex][cellIndex].child === ""
          ) {
            return true;
          }
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
