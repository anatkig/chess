import { PieceInfo, CellType, KingRookTracker, FastPawn, Drag } from "../types/types";

const checkIfCheckOrMate = (
  cells: CellType[][],
  initColor: string,
  track: KingRookTracker,
  fastPawn: FastPawn,
  check: boolean,
  trackFastPawn: (rowIndex: number, cellIndex: number, pieceColor: string) => void,

  allowPieceMoves: (
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
  ) => boolean | undefined,
  threatPaths?: number[][]
) => {
  const whitePieces: PieceInfo[] = [];
  const blackPieces: PieceInfo[] = [];

  cells.forEach((row, rowInd) =>
    row.forEach((cell, cellInd) => {
      if (cell.child.includes("white")) {
        whitePieces.push({
          rowNumber: rowInd,
          cellNumber: cellInd,
          type: cell.child.split("-")[1],
        });
      }
      if (cell.child.includes("black")) {
        blackPieces.push({
          rowNumber: rowInd,
          cellNumber: cellInd,
          type: cell.child.split("-")[1],
        });
      }
    })
  );

  const whiteKingPosition = whitePieces.find((piece) => piece.type === "king");
  const blackKingPosition = blackPieces.find((piece) => piece.type === "king");

  const futureCells = JSON.parse(JSON.stringify(cells));

  if (
    (initColor === "white" &&
      blackPieces.every((piece) => {
        return !allowPieceMoves(
          {
            dragStartCoordinates: [piece.rowNumber, piece.cellNumber],
            type: piece.type,
            color: "black",
          },
          "controlZoneCheck",
          whiteKingPosition?.cellNumber || 3,
          whiteKingPosition?.rowNumber || 0,
          futureCells,
          track,
          false,
          fastPawn,
          check,
          trackFastPawn,
          threatPaths
        );
      })) ||
    (initColor === "black" &&
      whitePieces.every(
        (piece) =>
          !allowPieceMoves(
            {
              dragStartCoordinates: [piece.rowNumber, piece.cellNumber],
              type: piece.type,
              color: "white",
            },
            "controlZoneCheck",
            blackKingPosition?.cellNumber || 3,
            blackKingPosition?.rowNumber || 7,
            futureCells,
            track,
            true,
            fastPawn,
            check,
            trackFastPawn,
            threatPaths
          )
      ))
  ) {
    return true;
  }
};

export default checkIfCheckOrMate;
