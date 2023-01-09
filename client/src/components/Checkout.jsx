import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const cartState = useSelector((state) => state.cartReducer);
  const [money, setMoney] = useState(0);
  const cartItems = cartState.cartItems;
  const navigate = useNavigate();
  const orderHandler = () => {
    const reducePrice = cartItems.reduce((x, item) => x + item.price, 0);
    const totalPrice = Number(reducePrice).toFixed(0);
    if (name === "" || phone === "" || shippingAddress === "") {
      toast.error("Field is empty");
    } else {
      try {
        const { data } = axios.post(`/api/orders/placeorders`, {
          name: name,
          phone: phone,
          shippingAddress: shippingAddress,
          cartItems,
          totalPrice,
        });

        console.log(data);
        toast.success("Order Placed Successfully !");
        setTimeout(redirect, 1000);
      } catch (err) {
        console.log(err);
      }
    }
  };
  function redirect() {
    navigate("/");
  }

  useEffect(() => {
    function updateMoney() {
      let total = 0;
      for (let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].cartQuantity * cartItems[i].price;
      }
      setMoney(total);
    }
    updateMoney();
  }, [cartItems]);

  return (
    <div>
      <div className="fixed z-20 h-[75px] w-full bg-black">
        <Navbar />
      </div>
      <div className="container">
        <div className="row md:flex-col-reverse">
          <div className="col-lg-6">
            <div className="max-w-[500px] pt-[200px] md:pt-[50px]">
              <div>
                <h2>Full Name</h2>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="ease-inout my-2 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-base font-normal text-gray-700 transition focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                />
              </div>
              <div>
                <h2>Phone</h2>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="ease-inout my-2 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-base font-normal text-gray-700 transition focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                />
              </div>
              <div>
                <h2>Address</h2>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="ease-inout my-2 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-base font-normal text-gray-700 transition focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                />
              </div>
              <button
                onClick={orderHandler}
                className="my-2 inline-block h-11 w-full rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center capitalize text-white"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="pt-[200px] md:pt-[150px]">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.cartQuantity}</td>
                      <td>${item.price}</td>
                      <td>${item.price * item.cartQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h2 className="mt-4 flex items-end justify-end text-base font-medium">
                Total Amount: ${money}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
