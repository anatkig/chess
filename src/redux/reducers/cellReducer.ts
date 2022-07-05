const cells: any = [...new Array(8)].map((row, rowNumber) => [...new Array(8)].map((cell, colNumber) =>

({
    backgroundColor:
        rowNumber % 2 === 0 && colNumber % 2 !== 0
            ? "black" : rowNumber % 2 !== 0 && colNumber % 2 === 0
                ? "black" : "white",
    child: rowNumber === 1
        ? "white-pawn" : rowNumber === 6
            ? "black-pawn" : rowNumber === 0 && (colNumber === 0 || colNumber === 7)
                ? "white-rook" : rowNumber === 0 && (colNumber === 1 || colNumber === 6)
                    ? "white-knight" : rowNumber === 0 && (colNumber === 2 || colNumber === 5)
                        ? "white-bishop" : rowNumber === 0 && colNumber === 3
                            ? "white-queen" : rowNumber === 0 && colNumber === 4
                                ? "white-king" : rowNumber === 7 && (colNumber === 0 || colNumber === 7)
                                    ? "black-rook" : rowNumber === 7 && (colNumber === 1 || colNumber === 6)
                                        ? "black-knight" : rowNumber === 7 && (colNumber === 2 || colNumber === 5)
                                            ? "black-bishop" : rowNumber === 7 && colNumber === 3
                                                ? "black-queen" : rowNumber === 7 && colNumber === 4
                                                    ? "black-king" : ""
})
))

const cellReducer = (state = cells, action: any) => {
    switch (action.type) {
        case "colorCell":
            return cells.map((cell: any) => cell.id = action.payload.id && cell.color === "green");
        default:
            return state;
    }
}

export default cellReducer;