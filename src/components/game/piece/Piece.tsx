import React from "react";
import Queen from "../../pieces/Queen";
import King from "../../pieces/King";
import Pawn from "../../pieces/Pawn";
import Bishop from "../../pieces/Bishop";
import Rook from "../../pieces/Rook";
import Knight from "../../pieces/Knight";
import "./piece.css";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { DRAG_START } from "../../../constants/constants";

const Piece = ({
  type,
  color,
  rowIndex,
  cellIndex,
  writeOnStartCoordinates,
}: {
  type: string;
  color: string;
  rowIndex: number;
  cellIndex: number;
  writeOnStartCoordinates: (
    dragPosition: [number, number],
    type: string,
    color: string
  ) => void;
}) => {
  return (
    <div
      className="flex place-content-center cursor-pointer rotate-180 piece"
      draggable
      onDragStart={() =>
        writeOnStartCoordinates([rowIndex, cellIndex], type, color)
      }
    >
      {type === "knight" ? (
        <Knight color={color} />
      ) : type === "queen" ? (
        <Queen color={color} />
      ) : type === "king" ? (
        <King color={color} />
      ) : type === "rook" ? (
        <Rook color={color} />
      ) : type === "bishop" ? (
        <Bishop color={color} />
      ) : (
        <Pawn color={color} />
      )}
    </div>
  );
};
const mapDispatchtoProps = (dispatch: Dispatch) => {
  return {
    writeOnStartCoordinates: (
      dragPosition: [number, number],
      type: string,
      color: string
    ) => dispatch({ type: DRAG_START, payload: { dragPosition, type, color } }),
  };
};

export default connect(null, mapDispatchtoProps)(Piece);
