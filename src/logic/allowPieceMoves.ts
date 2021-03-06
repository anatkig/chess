import { Drag, CellType, KingRookTracker, FastPawn, PieceInfo } from "../types/types";
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

  trackFastPawn: (rowIndex: number, cellIndex: number, pieceColor: string) => void,
  threatPaths?: number[][],
  setCheck?: (threatPath: number[][]) => void
) => {
  const initRow = drag.dragStartCoordinates[0];
  const initCell = drag.dragStartCoordinates[1];
  const initType = drag.type;
  const initPieceColor = drag.color;
  if ((initPieceColor === "black" && !turn) || (initPieceColor === "white" && turn)) {
    if (
      check === false ||
      threatPaths?.some(
        // in case of check all pieces except king can only move into threatpath thus protecting the king
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
              pieceColor,
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
          const whitePieces: PieceInfo[] = [];
          const blackPieces: PieceInfo[] = [];
          cells.forEach((row, rowInd) =>
            row.forEach((cell, cellInd) => {
              if (cell.child.includes("white") && !cell.child.includes("king")) {
                whitePieces.push({
                  rowNumber: rowInd,
                  cellNumber: cellInd,
                  type: cell.child.split("-")[1],
                });
              }
              if (cell.child.includes("black") && !cell.child.includes("king")) {
                blackPieces.push({
                  rowNumber: rowInd,
                  cellNumber: cellInd,
                  type: cell.child.split("-")[1],
                });
              }
            })
          );
          if (
            (initPieceColor === "white" &&
              blackPieces.every((piece) => {
                return !allowPieceMoves(
                  {
                    dragStartCoordinates: [piece.rowNumber, piece.cellNumber],
                    type: piece.type,
                    color: "black",
                  },
                  "controlZoneCheck",
                  cellIndex,
                  rowIndex,
                  cells,
                  track,
                  false,
                  fastPawn,
                  check,
                  trackFastPawn,
                  threatPaths
                );
              })) ||
            (initPieceColor === "black" &&
              whitePieces.every(
                (piece) =>
                  !allowPieceMoves(
                    {
                      dragStartCoordinates: [piece.rowNumber, piece.cellNumber],
                      type: piece.type,
                      color: "white",
                    },
                    "controlZoneCheck",
                    cellIndex,
                    rowIndex,
                    cells,
                    track,
                    true,
                    fastPawn,
                    check,
                    trackFastPawn,
                    threatPaths
                  )
              ))
          ) {
            return (
              allowKingMoves(
                initRow,
                rowIndex,
                initCell,
                cellIndex,
                cells,
                initPieceColor,
                track
              ) && !threatPaths?.some((path) => path[0] === rowIndex && path[1] === cellIndex)
            );
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
              initPieceColor,
              setCheck
            ) ||
            allowRookMoves(initRow, rowIndex, initCell, cellIndex, cells, initPieceColor, setCheck)
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
            (Math.abs(initRow - rowIndex) === 2 && Math.abs(initCell - cellIndex) === 1) ||
            (Math.abs(initCell - cellIndex) === 2 && Math.abs(initRow - rowIndex) === 1)
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
