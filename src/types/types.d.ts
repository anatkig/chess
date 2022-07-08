export interface Store {
  cellReducer: CellType[][];
  dragReducer: Drag;
}

export interface Drag {
  dragStartCoordinates: number[];
  type: string;
  color: string;
}

export interface CellType {
  backgroundColor: string;
  child: string;
}
