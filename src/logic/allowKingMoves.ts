import { CellType, KingRookTracker } from "../types/types";

const allowKingMoves = (
  initRow: number,
  rowIndex: number,
  initCell: number,
  cellIndex: number,
  cells: CellType[][],
  initPieceColor: string,
  track: KingRookTracker
) => {
  if (
    Math.abs(initRow - rowIndex) <= 1 &&
    Math.abs(initCell - cellIndex) <= 1 &&
    !cells[rowIndex + 1]?.[cellIndex].child.includes(
      `${initPieceColor === "white" ? "black" : "white"}-king`
    ) &&
    !cells[rowIndex - 1]?.[cellIndex].child.includes(
      `${initPieceColor === "white" ? "black" : "white"}-king`
    ) &&
    !cells[rowIndex][cellIndex + 1].child.includes(
      `${initPieceColor === "white" ? "black" : "white"}-king`
    ) &&
    !cells[rowIndex][cellIndex - 1].child.includes(
      `${initPieceColor === "white" ? "black" : "white"}-king`
    ) &&
    !cells[rowIndex + 1]?.[cellIndex + 1].child.includes(
      `${initPieceColor === "white" ? "black" : "white"}-king`
    ) &&
    !cells[rowIndex - 1]?.[cellIndex - 1].child.includes(
      `${initPieceColor === "white" ? "black" : "white"}-king`
    ) &&
    !cells[rowIndex + 1]?.[cellIndex - 1].child.includes(
      `${initPieceColor === "white" ? "black" : "white"}-king`
    ) &&
    !cells[rowIndex - 1]?.[cellIndex + 1].child.includes(
      `${initPieceColor === "white" ? "black" : "white"}-king`
    ) &&
    !cells[rowIndex][cellIndex].child.includes(
      `${initPieceColor === "white" ? "black" : "white"}-king`
    )
  ) {
    return true;
  }
  // castling
  else if (
    initRow === 0 &&
    rowIndex === 0 &&
    cells[0][3].child === "white-king" &&
    track.whiteKing === true
  ) {
    if (
      cells[0][4].child === "" &&
      cells[0][5].child === "" &&
      cells[0][6].child === "" &&
      cells[0][7].child === "white-rook" &&
      cellIndex === 5
    ) {
      return true;
    } else if (
      cells[0][1].child === "" &&
      cells[0][2].child === "" &&
      cells[0][0].child === "white-rook" &&
      cellIndex === 1
    ) {
      return true;
    }
  }
  // castling
  else if (
    initRow === 7 &&
    rowIndex === 7 &&
    cells[7][3].child === "black-king" &&
    track.blackKing === true
  ) {
    if (
      cells[7][4].child === "" &&
      cells[7][5].child === "" &&
      cells[7][6].child === "" &&
      cells[7][7].child === "black-rook" &&
      cellIndex === 5
    ) {
      return true;
    } else if (
      cells[7][1].child === "" &&
      cells[7][2].child === "" &&
      cells[7][0].child === "black-rook" &&
      cellIndex === 1
    ) {
      return true;
    }
  }
};

export default allowKingMoves;
