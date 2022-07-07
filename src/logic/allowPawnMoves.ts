import { CellType } from "../types/types";

const allowPawnMoves = (
  cellIndex: number,
  initCell: number,
  rowIndex: number,
  initRow: number,
  initPieceColor: string,
  cells: [CellType[]]
) => {
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
};

export default allowPawnMoves;
