import { CellType, FastPawn } from "../types/types";

const allowPawnMoves = (
  cellIndex: number,
  initCell: number,
  rowIndex: number,
  initRow: number,
  initPieceColor: string,
  cells: CellType[][],
  fastPawn: FastPawn,
  controlZoneCheck: string | undefined,
  trackFastPawn: (
    rowIndex: number,
    cellIndex: number,
    pieceColor: string
  ) => void
) => {
  if (
    Math.abs(cellIndex - initCell) === 1 &&
    ((initPieceColor === "white" &&
      rowIndex - initRow === 1 &&
      (cells[rowIndex][cellIndex].child.includes("black") ||
        controlZoneCheck === "controlZoneCheck")) ||
      (initPieceColor === "black" &&
        initRow - rowIndex === 1 &&
        (cells[rowIndex][cellIndex].child.includes("white") ||
          controlZoneCheck === "controlZoneCheck")))
  ) {
    return true;
  } else if (
    initRow === 4 &&
    fastPawn.pawnRow === 4 &&
    fastPawn.pawnColor === "black" &&
    initPieceColor === "white"
  ) {
    if (
      initCell + 1 === fastPawn.pawnCell &&
      rowIndex === 5 &&
      cellIndex === initCell + 1
    ) {
      return true;
    } else if (
      initCell - 1 === fastPawn.pawnCell &&
      rowIndex === 5 &&
      cellIndex === initCell - 1
    ) {
      return true;
    }
  } else if (
    initRow === 3 &&
    fastPawn.pawnRow === 3 &&
    fastPawn.pawnColor === "white" &&
    initPieceColor === "black"
  ) {
    if (
      initCell + 1 === fastPawn.pawnCell &&
      rowIndex === 2 &&
      cellIndex === initCell + 1
    ) {
      return true;
    } else if (
      initCell - 1 === fastPawn.pawnCell &&
      rowIndex === 2 &&
      cellIndex === initCell - 1
    ) {
      return true;
    }
  } else if (initCell === cellIndex) {
    if (initPieceColor === "white") {
      if (
        initRow === 1 &&
        rowIndex - initRow === 2 &&
        cells[rowIndex][cellIndex].child === "" &&
        cells[rowIndex - 1][cellIndex].child === ""
      ) {
        trackFastPawn(rowIndex, cellIndex, initPieceColor);
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
        initRow - rowIndex === 2 &&
        cells[rowIndex][cellIndex].child === "" &&
        cells[rowIndex + 1][cellIndex].child === ""
      ) {
        trackFastPawn(rowIndex, cellIndex, initPieceColor);
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
