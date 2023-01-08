import React, { useEffect } from "react";
import Navbar from "./Navbar";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../redux/reducer/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import emptyImage from "../assets/empty-cart.png";

const Cart = () => {
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="div">
      <div className="h-[80px] w-full bg-black ">
        <Navbar />
      </div>
      <div className="cart-container text-slate-800">
        <h2 className="my-[50px] block w-full text-center text-3xl font-medium">
          Shopping Cart
        </h2>
        {cartItems.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center">
            <p className="text-center">Your cart is currently empty</p>
            <img src={emptyImage} alt="" className="my-5 h-auto w-[300px]" />
            <div className="w-full">
              <Link to="/" className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span className="ml-2">Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="grid grid-cols-4 items-center border-b border-b-gray-400 py-4">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            {cartItems &&
              cartItems.map((cartItem) => (
                <div
                  className="grid grid-cols-4 items-center border-b border-b-gray-400 py-8"
                  key={cartItem._id}
                >
                  <div className="flex flex-col">
                    <img
                      src={cartItem.image?.url}
                      alt=""
                      className="h-auto w-[200px]"
                    />
                    <div className="py-3">
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.description}</p>
                    </div>
                  </div>
                  <div className="cart-product-price">${cartItem.price}</div>
                  <div className="flex items-center">
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className="mx-4">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>${cartItem.price * cartItem.cartQuantity}</span>
                    <button
                      className="rounded-md bg-red-600 p-2 text-slate-200"
                      onClick={() => handleRemoveFromCart(cartItem)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            <div className="my-[30px] flex flex-col items-end justify-end text-right">
              <button
                className="mb-2 rounded-sm bg-purple-600 p-2 text-slate-200"
                onClick={() => handleClearCart()}
              >
                Clear Cart
              </button>
              <div className="cart-checkout">
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-medium">Subtotal</span>
                  <span className="text-xl font-medium">
                    ${cartState.cartTotalAmount}
                  </span>
                </div>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to="/checkout">
                  <button className="my-2 w-full rounded-sm bg-blue-500 p-2 text-center text-slate-200">
                    Check out
                  </button>
                </Link>
                <div className="flex items-center justify-end">
                  <Link to="/" className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                    <span className="ml-4">Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
