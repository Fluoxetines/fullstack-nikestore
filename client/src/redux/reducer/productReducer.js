const getAllProduct = (state = { products: [] }, action) => {
  switch (action.type) {
    case "GET_PRODUCT_REQUEST":
      return {
        loading: true,
        ...state,
      };

    case "GET_PRODUCT_SUCCESS":
      return {
        loading: false,
        products: action.payload,
      };

    case "GET_PRODUCT_FAIL":
      return {
        err: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default getAllProduct;
