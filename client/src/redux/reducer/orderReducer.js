const placeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "PLACE_ORDER_REQUEST":
      return { loading: true };
    case "PLACE_ORDER_SUCCESS":
      return { loading: true };
    case "PLACE_ORDER_FAIL":
      return { loading: false };
    default:
      return state;
  }
};

export default placeOrderReducer;
