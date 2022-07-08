const cells: any = [...new Array(8)].map((row, rowNumber) =>
  [...new Array(8)].map((cell, colNumber) => ({
    backgroundColor:
      rowNumber % 2 === 0 && colNumber % 2 !== 0
        ? "black"
        : rowNumber % 2 !== 0 && colNumber % 2 === 0
        ? "black"
        : "white",
    child:
      rowNumber === 1
        ? "white-pawn"
        : rowNumber === 6
        ? "black-pawn"
        : rowNumber === 0 && (colNumber === 0 || colNumber === 7)
        ? "white-rook"
        : rowNumber === 0 && (colNumber === 1 || colNumber === 6)
        ? "white-knight"
        : rowNumber === 0 && (colNumber === 2 || colNumber === 5)
        ? "white-bishop"
        : rowNumber === 0 && colNumber === 4
        ? "white-queen"
        : rowNumber === 0 && colNumber === 3
        ? "white-king"
        : rowNumber === 7 && (colNumber === 0 || colNumber === 7)
        ? "black-rook"
        : rowNumber === 7 && (colNumber === 1 || colNumber === 6)
        ? "black-knight"
        : rowNumber === 7 && (colNumber === 2 || colNumber === 5)
        ? "black-bishop"
        : rowNumber === 7 && colNumber === 4
        ? "black-queen"
        : rowNumber === 7 && colNumber === 3
        ? "black-king"
        : "",
  }))
);

const cellReducer = (state = cells, action: any) => {
  switch (action.type) {
    case "colorCell":
      return cells.map(
        (cell: any) => (cell.id = action.payload.id && cell.color === "green")
      );
    case "RENEW_ON_DROP":
      const tempCells = JSON.parse(JSON.stringify(state));
      const data = action.payload;

      tempCells[data.cellTakerRowNumber][
        data.cellTakerCellNumber
      ].child = `${data.cellGiverPieceColor}-${data.cellGiverPieceType}`;
      tempCells[data.cellGiverRowNumber][data.cellGiverCellNumber].child = "";

      if (
        data.cellGiverPieceType === "king" &&
        data.cellGiverPieceColor === "white"
      ) {
        if (data.cellTakerRowNumber === 0 && data.cellTakerCellNumber === 1) {
          tempCells[0][2].child = "white-rook";
          tempCells[0][0].child = "";
        } else if (
          data.cellTakerRowNumber === 0 &&
          data.cellTakerCellNumber === 5
        ) {
          tempCells[0][4].child = "white-rook";
          tempCells[0][7].child = "";
        }
      } else if (
        data.cellGiverPieceType === "king" &&
        data.cellGiverPieceColor === "black"
      ) {
        if (data.cellTakerRowNumber === 7 && data.cellTakerCellNumber === 1) {
          tempCells[7][2].child = "black-rook";
          tempCells[7][0].child = "";
        } else if (
          data.cellTakerRowNumber === 7 &&
          data.cellTakerCellNumber === 5
        ) {
          tempCells[7][4].child = "black-rook";
          tempCells[7][7].child = "";
        }
      }
      return tempCells;

    default:
      return state;
  }
};

export default cellReducer;
