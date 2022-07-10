import { CellType } from "../types/types";

const allowRookMoves = (
  initRow: number,
  rowIndex: number,
  initCell: number,
  cellIndex: number,
  cells: CellType[][],
  initPieceColor: string,
  setCheck?: (threatPass: number[][]) => void
) => {
  if (initRow === rowIndex) {
    if (initCell > cellIndex) {
      if (
        cells[rowIndex]
          .slice(cellIndex + 1, initCell)
          .every((cell) => cell.child === "") &&
        !cells[rowIndex][cellIndex].child.includes(initPieceColor)
      ) {
        return true;
      }
    } else {
      if (
        cells[rowIndex]
          .slice(initCell + 1, cellIndex)
          .every((cell) => cell.child === "") &&
        !cells[rowIndex][cellIndex].child.includes(initPieceColor)
      ) {
        return true;
      }
    }
  } else if (initCell === cellIndex) {
    // the cells which the rook passes before reaching the current cell
    const passedCells: CellType[] = [];

    if (initRow < rowIndex) {
      cells.slice(initRow + 1, rowIndex).forEach((row, rowInd) => {
        passedCells.push(cells[rowInd + initRow + 1][cellIndex]);
      });
    } else {
      cells.slice(rowIndex + 1, initRow).forEach((row, rowInd) => {
        passedCells.push(cells[rowInd + rowIndex + 1][cellIndex]);
      });
    }
    if (
      passedCells.every((cell) => cell.child === "") &&
      !cells[rowIndex][cellIndex].child.includes(initPieceColor)
    ) {
      return true;
    }
  }
};

export default allowRookMoves;
