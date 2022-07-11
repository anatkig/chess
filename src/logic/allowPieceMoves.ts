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
  ) => void,
  threatPaths?: number[][],
  setCheck?: (threatPath: number[][]) => void
) => {
  const initRow = drag.dragStartCoordinates[0];
  const initCell = drag.dragStartCoordinates[1];
  const initType = drag.type;
  const initPieceColor = drag.color;
  if (
    (initPieceColor === "black" && !turn) ||
    (initPieceColor === "white" && turn)
  ) {
    if (
      check === false ||
      threatPaths?.some(
        (path) => path[0] === rowIndex && path[1] === cellIndex
      ) ||
      initType === "king"
    ) {
      if (initPieceColor !== pieceColor) {
        if (initType === "pawn") {
          if (
            allowPawnMoves(
              cellIndex,
              initCell,
              rowIndex,
              initRow,
              initPieceColor,
              cells,
              fastPawn,
              trackFastPawn
            )
          ) {
            if (cells[rowIndex][cellIndex].child.includes("king") && setCheck) {
              setCheck([
                [initRow, initCell],
                [rowIndex, cellIndex],
              ]);
            }
            return true;
          }
        } else if (initType === "king") {
          return (
            allowKingMoves(
              initRow,
              rowIndex,
              initCell,
              cellIndex,
              cells,
              initPieceColor,
              track
            ) &&
            !threatPaths?.some(
              (path) => path[0] === rowIndex && path[1] === cellIndex
            )
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
              initPieceColor,
              setCheck
            ) ||
            allowRookMoves(
              initRow,
              rowIndex,
              initCell,
              cellIndex,
              cells,
              initPieceColor,
              setCheck
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
            initPieceColor,
            setCheck
          );
        } else if (initType === "bishop") {
          return allowBishopMoves(
            initRow,
            rowIndex,
            initCell,
            cellIndex,
            cells,
            initPieceColor,
            setCheck
          );
        } else if (initType === "knight") {
          if (
            (Math.abs(initRow - rowIndex) === 2 &&
              Math.abs(initCell - cellIndex) === 1) ||
            (Math.abs(initCell - cellIndex) === 2 &&
              Math.abs(initRow - rowIndex) === 1)
          ) {
            if (cells[rowIndex][cellIndex].child.includes("king") && setCheck) {
              setCheck([
                [initRow, initCell],
                [rowIndex, cellIndex],
              ]);
            }
            return true;
          }
        }
        return false;
      }
    }
  }
};

export default allowPieceMoves;
