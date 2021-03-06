import { DragReducerAction } from "../../types/types";
import { DRAG_START } from "../../constants/constants";

const drag = {
  dragStartCoordinates: [0, 0],
  type: "",
  color: "",
};

const dragReducer = (state = drag, action: DragReducerAction) => {
  switch (action.type) {
    case DRAG_START:
      return {
        ...drag,
        dragStartCoordinates: [
          action.payload.dragPosition[0],
          action.payload.dragPosition[1],
        ],
        type: action.payload.type,
        color: action.payload.color,
      };
    default:
      return state;
  }
};

export default dragReducer;
