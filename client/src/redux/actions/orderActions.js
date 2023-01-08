import axios from "axios";

export const placeOrder = () => async (dispatch, getState) => {
  dispatch({ type: "PLACE_ORDER_REQUEST" });

  const cartItems = getState().cartReducer.cartItems;

  var reducePrice = cartItems.reduce((x, item) => x + item.price, 0);
  var totalPrice = Number(reducePrice).toFixed(0);

  var userAccount = localStorage.getItem("userAccount");
  var shippingAddress = localStorage.getItem("shippingAddress");
  var phone = localStorage.getItem("phone");

  try {
    const res = await axios.post(`/api/orders/placeorders`, {
      totalPrice,
      userAccount,
      cartItems,
      cartid: cartItems._id,
      shippingAddress,
      phone,
    });
    dispatch({ type: "PLACE_ORDER_SUCCESS" });
    console.log(res);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("phone");
    localStorage.removeItem("userAccount");
  } catch (err) {
    dispatch({ type: "PLACE_ORDER_FAIL" });
    console.log(err);
  }
};

export const getOrderDetails = () => async (dispatch, getState) => {
  const cartItems = getState().cartReducer.cartItems;

  dispatch({ type: "PLACE_ORDER_REQUEST" });

  try {
    const res = await axios.post(`/api/ordersdetail/orderdetail`, {
      productID: cartItems._id,
    });
    dispatch({ type: "PLACE_ORDER_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "PLACE_ORDER_FAIL", payload: err });
  }
};
