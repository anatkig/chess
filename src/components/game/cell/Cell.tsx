import React, { ReactElement } from "react";
import "./cell.css";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import {
  Store,
  Drag,
  CellType,
  KingRookTracker,
  FastPawn,
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
  renewOnDrop,
  trackKingRookFirstMoves,
  moveWhite,
  moveBlack,
  trackFastPawn,
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
}) => {
  const handleDragOver = (event: any) => {
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
        trackFastPawn
      )
    ) {
      event.preventDefault();
    }
  };
  return (
    <div
      className={`${
        color === "white" ? "bg-[#E2BB7B]" : "bg-[#AE734E]"
      } flex place-items-center justify-center cell`}
      onDragOver={handleDragOver}
      onDrop={() => {
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
      }}
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
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Cell);
