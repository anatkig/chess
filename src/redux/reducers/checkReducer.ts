const check = {
  check: false,
};

const checkReducer = (state = check, action: any) => {
  switch (action.type) {
    case "SET_CHECK":
      return {
        ...check,
        check: true,
      };
    case "UNSET_CHECK":
      return {
        ...check,
        check: false,
      };
    default:
      return state;
  }
};

export default checkReducer;
