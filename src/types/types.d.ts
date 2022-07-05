export interface Store {
    cellReducer: [
        CellType[]
    ]
}

export interface CellType {
    backgroundColor: string;
    child: string;
}