const cells: any = [...new Array(8)].map((row, rowNumber) => [...new Array(8)].map((cell, index) =>

    ({ backgroundColor: rowNumber % 2 === 0 && index % 2 !== 0 ? "black" : rowNumber % 2 !== 0 && index % 2 === 0 ? "black" : "white" })
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