import React, { ReactElement } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import {
  Store,
  Drag,
  CellType,
  KingRookTracker,
  FastPawn,
  Check,
  PieceInfo,
} from "../../../types/types";
import allowPieceMoves from "../../../logic/allowPieceMoves";

const Cell = ({
  color,
  children,
  rowIndex,
  cellIndex,
  drag,
  pieceColor,
  cells,
  track,
  turn,
  fastPawn,
  check,
  threatPaths,
  checks,
  renewOnDrop,
  trackKingRookFirstMoves,
  moveWhite,
  moveBlack,
  trackFastPawn,
  setCheck,
  unsetCheck,
}: {
  color: string;
  children?: ReactElement;
  rowIndex: number;
  cellIndex: number;
  drag: Drag;
  pieceColor?: string;
  cells: CellType[][];
  track: KingRookTracker;
  turn: boolean;
  fastPawn: FastPawn;
  check: boolean;
  threatPaths: number[][];
  checks: Check;
  renewOnDrop: (
    cellGiverRowNumber: number,
    cellGiverCellNumber: number,
    cellTakerRowNumber: number,
    cellTakerCellNumber: number,
    cellGiverColor: string,
    cellGiverType: string,
    track: KingRookTracker
  ) => void;
  trackKingRookFirstMoves: (
    initialCellIndex: number,
    initialRowIndex: number,
    pieceType: string,
    pieceColor: string
  ) => void;
  moveWhite: () => void;
  moveBlack: () => void;
  trackFastPawn: (
    rowIndex: number,
    cellIndex: number,
    pieceColor: string
  ) => void;
  setCheck: (threatPath: number[][]) => void;
  unsetCheck: () => void;
}) => {
  const handleDragOver = (event: React.DragEvent) => {
    if (
      allowPieceMoves(
        drag,
        pieceColor,
        cellIndex,
        rowIndex,
        cells,
        track,
        turn,
        fastPawn,
        check,
        trackFastPawn,
        threatPaths
      )
    ) {
      // checking if the move will cause auto check
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

      const whiteKingPosition = whitePieces.find(
        (piece) => piece.type === "king"
      );
      const blackKingPosition = blackPieces.find(
        (piece) => piece.type === "king"
      );

      const futureCells = JSON.parse(JSON.stringify(cells));
      futureCells[rowIndex][cellIndex].child = `${drag.color}-${drag.type}`;
      futureCells[drag.dragStartCoordinates[0]][
        drag.dragStartCoordinates[1]
      ].child = "";

      if (
        (drag.color === "white" &&
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
        (drag.color === "black" &&
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
        event.preventDefault();
      }
    }
  };

  const handleDrop = () => {
    if (check) {
      unsetCheck();
    }
    renewOnDrop(
      drag.dragStartCoordinates[0],
      drag.dragStartCoordinates[1],
      rowIndex,
      cellIndex,
      drag.color,
      drag.type,
      track
    );
    if (drag.type === "king" || drag.type === "rook") {
      trackKingRookFirstMoves(
        drag.dragStartCoordinates[1],
        drag.dragStartCoordinates[0],
        drag.type,
        drag.color
      );
    }
    if (drag.color === "white") {
      moveBlack();
    } else {
      moveWhite();
    }

    const kingLocation = [] as unknown as [number, number];
    cells.some((row, rowInd) =>
      row.some((cell, cellInd) => {
        const cellChildValues = cell.child.split("-");
        if (
          drag.color !== cellChildValues[0] &&
          cellChildValues[1] === "king"
        ) {
          kingLocation.push(rowInd);
          kingLocation.push(cellInd);
          return true;
        } else {
          return false;
        }
      })
    );

    // also checks if the next move target the enemy king thus checking it
    allowPieceMoves(
      {
        dragStartCoordinates: [rowIndex, cellIndex],
        type: drag.type,
        color: drag.color,
      },
      pieceColor,
      kingLocation[1],
      kingLocation[0],
      cells,
      track,
      turn,
      fastPawn,
      check,
      trackFastPawn,
      threatPaths,
      setCheck
    );
  };
  return (
    <div
      className={`${
        color === "white" ? "bg-[#E2BB7B]" : "bg-[#AE734E]"
      } w-[70px]  h-[70px] flex place-items-center justify-center cell`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

const mapStateToProps = (state: Store) => ({
  drag: state.dragReducer,
  cells: state.cellReducer,
  track: state.kingRookTrackerReducer,
  turn: state.moveTurnReducer.turn,
  fastPawn: state.fastPawnReducer,
  check: state.checkReducer.check,
  threatPaths: state.checkReducer.threatPaths,
  checks: state.checkReducer,
});

const mapDispatchtoProps = (dispatch: Dispatch) => {
  return {
    renewOnDrop: (
      cellGiverRowNumber: number,
      cellGiverCellNumber: number,
      cellTakerRowNumber: number,
      cellTakerCellNumber: number,
      cellGiverPieceColor: string,
      cellGiverPieceType: string,
      track: KingRookTracker
    ) =>
      dispatch({
        type: "RENEW_ON_DROP",
        payload: {
          cellGiverRowNumber,
          cellGiverCellNumber,
          cellTakerRowNumber,
          cellTakerCellNumber,
          cellGiverPieceColor,
          cellGiverPieceType,
          track,
        },
      }),
    trackKingRookFirstMoves: (
      initialCellIndex: number,
      initialRowIndex: number,
      pieceType: string,
      pieceColor: string
    ) =>
      dispatch({
        type: "KING_OR_ROOK_FIRST_MOVE",
        payload: { initialCellIndex, initialRowIndex, pieceColor, pieceType },
      }),
    moveWhite: () => dispatch({ type: "WHITE_MOVE" }),
    moveBlack: () => dispatch({ type: "BLACK_MOVE" }),
    trackFastPawn: (rowIndex: number, cellIndex: number, pieceColor: string) =>
      dispatch({
        type: "NEW_FAST_PAWN",
        payload: { rowIndex, cellIndex, pieceColor },
      }),
    setCheck: (threatPaths: number[][]) =>
      dispatch({ type: "SET_CHECK", payload: threatPaths }),
    unsetCheck: () => dispatch({ type: "UNSET_CHECK" }),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Cell);
