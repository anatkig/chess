const cells: any = []

const cellReducer = (state = cells, action: any) => {
    switch (action.type) {
        case "colorCell":
            return cells.map((cell: any) => cell.id = action.payload.id && cell.color === "green");
        default:
            return cells;
    }
}

export default cellReducer;