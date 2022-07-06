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
  color: String;
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
  return (
    <div
      className={`${
        color === "white" ? "bg-[#E2BB7B]" : "bg-[#AE734E]"
      } flex place-items-center justify-center cell`}
      onDragOver={(event: any) => event.preventDefault()}
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
