import { connect } from "react-redux";
import React from "react";
import { Store } from "../../../types/types";
import Cell from "../cell/Cell";
import Letters from "../letters/Letters";
import Numbers from "../numbers/Numbers";
import Piece from "../piece/Piece";
import { CellType } from "../../../types/types";

const Container = ({ cells }: { cells: CellType[][] }) => {
  return (
    <div className="container rotate-180">
      <Letters />
      <div className="flex mx-auto container-row w-[640px]">
        <Numbers />
        <div className="flex inner-container flex-wrap mx-auto border-2 border-black place-content-around w-[580px] h-[580px]">
          {cells.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <Cell
                color={cell.backgroundColor}
                key={cellIndex + cell.backgroundColor}
                rowIndex={rowIndex}
                cellIndex={cellIndex}
                pieceColor={cell.child?.split("-")[0]}
              >
                {cell.child ? (
                  <Piece
                    color={cell.child.split("-")[0]}
                    type={cell.child.split("-")[1]}
                    rowIndex={rowIndex}
                    cellIndex={cellIndex}
                  />
                ) : undefined}
              </Cell>
            ))
          )}
        </div>
        <Numbers />
      </div>
      <Letters />
    </div>
  );
};

const mapStateToProps = (state: Store) => ({ cells: state.cellReducer });

export default connect(mapStateToProps)(Container);
