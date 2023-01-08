import axios from "axios";
import React, { useEffect, useState, useReducer } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loading: true };
    case "UPDATE_SUCCESS":
      return { ...state, loading: false };
    case "UPDATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const UpdateOrder = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const params = useParams();
  const { id: orderID } = params;

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: true,
  });

  const handleSubmit = async () => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/orders/${orderID}`, {
        name,
        phone,
        shippingAddress,
      });
      toast.success("Update Orders Successfully");
      dispatch({ type: "UPDATE_SUCCESS" });
      navigate("/admin/orders");
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  useEffect(() => {
    const getOrderDetails = async () => {
      let result = await fetch(`/api/orders/${params.id}`);
      result = await result.json();
      setName(result.name);
      setPhone(result.phone);
      setShippingAddress(result.shippingAddress);
    };
    getOrderDetails();
  }, [params.id]);

  return (
    <>
      {loading && (
        <>
          <div className="fixed z-20 h-[75px] w-full bg-black">
            <Navbar />
          </div>
          <Sidebar />
          <div className="w-[95%] pl-[300px] md:w-full md:pl-[20px]">
            <form
              onSubmit={handleSubmit}
              className="nike-container flex min-h-screen flex-col items-center justify-center"
            >
              <div className="flex w-full items-start justify-between lg:flex-col md:flex-col">
                <div className="flex flex-col">
                  <h3 className="mb-4 text-2xl">Update Order</h3>
                  <span>Name</span>
                  <input
                    type="text"
                    value={name.replace(/['‘’"“”]/g, "")}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="my-2 min-w-[300px] rounded-md border border-solid border-slate-500 p-4"
                  />
                  <span>Phone</span>
                  <input
                    type="text"
                    value={phone.replace(/['‘’"“”]/g, "")}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="my-2 min-w-[300px] rounded-md border border-solid border-slate-500 p-4"
                  />
                  <span>ShippingAddress</span>
                  <input
                    type="text"
                    value={shippingAddress.replace(/['‘’"“”]/g, "")}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="my-2 min-w-[300px] rounded-md border border-solid border-slate-500 p-4"
                  />

                  <button className="my-2 h-11 w-full rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center capitalize text-white">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateOrder;
