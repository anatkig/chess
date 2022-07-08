import React, { ReactElement } from "react";
import "./cell.css";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { Store, Drag, CellType, KingRookTracker } from "../../../types/types";
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
  renewOnDrop,
  trackKingRookFirstMoves,
}: {
  color: string;
  children?: ReactElement;
  rowIndex: number;
  cellIndex: number;
  drag: Drag;
  pieceColor?: string;
  cells: CellType[][];
  track: KingRookTracker;
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
}) => {
  const handleDragOver = (event: any) => {
    if (allowPieceMoves(drag, pieceColor, cellIndex, rowIndex, cells, track)) {
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
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Cell);
