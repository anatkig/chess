import React, { ReactElement } from "react";
import "./cell.css";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { Store, Drag } from "../../../types/types";

const Cell = ({
  color,
  children,
  rowIndex,
  cellIndex,
  drag,
  renewOnDrop,
}: {
  color: string;
  children?: ReactElement;
  rowIndex: number;
  cellIndex: number;
  drag: Drag;
  renewOnDrop: (
    cellGiverRowNumber: number,
    cellGiverCellNumber: number,
    cellTakerRowNumber: number,
    cellTakerCellNumber: number,
    cellGiverColor: string,
    cellGiverType: string
  ) => void;
}) => {
  const handleDropOver = (event: any) => {
    const initRow = drag.dragStartCoordinates[0];
    const initCell = drag.dragStartCoordinates[1];
    const initType = drag.type;
    const initColor = drag.color;

    if (initType === "pawn") {
      if (initCell === cellIndex) {
        if (
          (initColor === "white" && initRow < rowIndex) ||
          (initColor === "black" && initRow > rowIndex)
        ) {
          event.preventDefault();
        }
      }
    } else if (initType === "king") {
      if (
        Math.abs(initRow - rowIndex) <= 1 &&
        Math.abs(initCell - cellIndex) <= 1
      ) {
        event.preventDefault();
      }
    } else if (initType === "queen") {
      if (
        initRow === rowIndex ||
        initCell === cellIndex ||
        Math.abs(initRow - rowIndex) === Math.abs(initCell - cellIndex)
      ) {
        event.preventDefault();
      }
    } else if (initType === "rook") {
      if (initRow === rowIndex || initCell === cellIndex) {
        event.preventDefault();
      }
    } else if (initType === "bishop") {
      if (Math.abs(initRow - rowIndex) === Math.abs(initCell - cellIndex)) {
        event.preventDefault();
      }
    } else if (initType === "knight") {
      if (
        (Math.abs(initRow - rowIndex) === 2 &&
          Math.abs(initCell - cellIndex) === 1) ||
        (Math.abs(initCell - cellIndex) === 2 && Math.abs(initRow - rowIndex))
      ) {
        event.preventDefault();
      }
    }
  };
  return (
    <div
      className={`${
        color === "white" ? "bg-[#E2BB7B]" : "bg-[#AE734E]"
      } flex place-items-center justify-center cell`}
      onDragOver={handleDropOver}
      onDrop={() =>
        renewOnDrop(
          drag.dragStartCoordinates[0],
          drag.dragStartCoordinates[1],
          rowIndex,
          cellIndex,
          drag.color,
          drag.type
        )
      }
    >
      {children}
    </div>
  );
};

const mapStateToProps = (state: Store) => ({ drag: state.dragReducer });

const mapDispatchtoProps = (dispatch: Dispatch) => {
  return {
    renewOnDrop: (
      cellGiverRowNumber: number,
      cellGiverCellNumber: number,
      cellTakerRowNumber: number,
      cellTakerCellNumber: number,
      cellGiverColor: string,
      cellGiverType: string
    ) =>
      dispatch({
        type: "RENEW_ON_DROP",
        payload: {
          cellGiverRowNumber,
          cellGiverCellNumber,
          cellTakerRowNumber,
          cellTakerCellNumber,
          cellGiverColor,
          cellGiverType,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Cell);
