import { CellType } from "../types/types";

const allowBishopMoves = (
  initRow: number,
  rowIndex: number,
  initCell: number,
  cellIndex: number,
  cells: [CellType[]],
  initPieceColor: string
) => {
  if (Math.abs(initRow - rowIndex) === Math.abs(initCell - cellIndex)) {
    const passedCells: CellType[] = [];

    if (initRow < rowIndex && initCell < cellIndex) {
      cells
        .slice(initRow + 1, rowIndex)
        .forEach((row, rowInd) =>
          passedCells.push(cells[rowInd + initRow + 1][initCell + rowInd + 1])
        );
    } else if (initRow < rowIndex && initCell > cellIndex) {
      cells
        .slice(initRow + 1, rowIndex)
        .forEach((row, rowInd) =>
          passedCells.push(cells[rowInd + initRow + 1][initCell - rowInd - 1])
        );
    } else if (initRow > rowIndex && initCell < cellIndex) {
      cells
        .slice(rowIndex + 1, initRow)
        .forEach((row, rowInd) =>
          passedCells.push(cells[rowInd + rowIndex + 1][cellIndex - rowInd - 1])
        );
    } else if (initRow > rowIndex && initCell > cellIndex) {
      cells
        .slice(rowIndex + 1, initRow)
        .forEach((row, rowInd) =>
          passedCells.push(cells[rowInd + rowIndex + 1][cellIndex + rowInd + 1])
        );
    }

    if (
      passedCells.every((cell) => cell.child === "") &&
      !cells[rowIndex][cellIndex].child.includes(initPieceColor)
    )
      return true;
  }
};

export default allowBishopMoves;
