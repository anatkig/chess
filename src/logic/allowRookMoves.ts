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
        if (cells[rowIndex][cellIndex].child.includes("king") && setCheck) {
          // collects coordinates of cells which can be blocked to prevent checking the king
          setCheck([
            [initRow, initCell],
            ...cells[rowIndex]
              .slice(cellIndex + 1, initCell)
              .map((cell, cellInd) => [rowIndex, cellInd + cellIndex + 1]),
          ]);
        }
        return true;
      }
    } else {
      if (
        cells[rowIndex]
          .slice(initCell + 1, cellIndex)
          .every((cell) => cell.child === "") &&
        !cells[rowIndex][cellIndex].child.includes(initPieceColor)
      ) {
        if (cells[rowIndex][cellIndex].child.includes("king") && setCheck) {
          // collects coordinates of cells which can be blocked to prevent checking the king
          setCheck([
            [initRow, initCell],
            ...cells[rowIndex]
              .slice(cellIndex + 1, initCell)
              .map((cell, cellInd) => [rowIndex, cellInd + initCell + 1]),
          ]);
        }
        return true;
      }
    }
  } else if (initCell === cellIndex) {
    // the cells which the rook passes before reaching the current cell
    const passedCells: CellType[] = [];
    const passedcellsCoordinates: number[][] = [];

    if (initRow < rowIndex) {
      cells.slice(initRow + 1, rowIndex).forEach((row, rowInd) => {
        passedCells.push(cells[rowInd + initRow + 1][cellIndex]);
        passedcellsCoordinates.push([rowInd + initRow + 1, cellIndex]);
      });
    } else {
      cells.slice(rowIndex + 1, initRow).forEach((row, rowInd) => {
        passedCells.push(cells[rowInd + rowIndex + 1][cellIndex]);
        passedcellsCoordinates.push([rowInd + rowIndex + 1, cellIndex]);
      });
    }
    if (
      passedCells.every((cell) => cell.child === "") &&
      !cells[rowIndex][cellIndex].child.includes(initPieceColor)
    ) {
      if (cells[rowIndex][cellIndex].child.includes("king") && setCheck) {
        // collects coordinates of cells which can be blocked to prevent checking the king
        setCheck([[initRow, initCell], ...passedcellsCoordinates]);
      }
      return true;
    }
  }
};

export default allowRookMoves;
