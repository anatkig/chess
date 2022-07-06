const drag = {
  dragStartCoordinates: [0, 0],
  type: "",
  color: "",
};

const dragReducer = (state = drag, action: any) => {
  switch (action.type) {
    case "DRAG_START":
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
