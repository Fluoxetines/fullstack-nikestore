import axios from "axios";

export const getAllProduct = () => async (dispatch) => {
  dispatch({ type: "GET_PRODUCT_REQUEST" });
  try {
    const res = await axios.get(`/api/products`);
    dispatch({ type: "GET_PRODUCT_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_PRODUCT_FAIL", payload: err });
  }
};
