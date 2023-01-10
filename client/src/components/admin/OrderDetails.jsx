import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import "./index.scss";
import Sidebar from "./Sidebar";

const OrderDetails = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: orderID } = useParams();
  const handleSubmit = async (id) => {
    const index = data.findIndex((e) => e._id === id);
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/orders/${data[index]._id}`, {
        _id: orderID,
      });
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("Order Delete Successfully !");
      window.location.reload(false);
    } catch (err) {
      console.log(err);
      dispatch({ type: "DELETE_FAIL" });
    }
  };
  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await axios.get(`/api/ordersdetail`);
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrder();
  }, []);

  return (
    <div>
      <>
        <div className="fixed z-20 h-[75px] w-full bg-black">
          <Navbar />
        </div>
        <Sidebar />
      </>
      <div className="w-full pl-[300px] pt-[200px] md:w-full md:px-[20px]">
        <h1 className="mb-5 text-2xl">Orders Details</h1>
        <div className="w-full overflow-x-auto">
          <table className="table-orders--details">
            <thead>
              <tr>
                <th>OrderID</th>
                <th>ProductID</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item) => (
                  <>
                    {/* Map phần order */}
                    <tr key={item._id}>
                      <td className="max-w-[200px] whitespace-pre-wrap lg:max-w-full">
                        {item.orderID}
                      </td>
                      <td>{item.productID}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>
                        <div className="flex items-center">
                          <button
                            className="rounded bg-blue-400 px-3 py-1 text-white"
                            onClick={() =>
                              navigate(`/admin/orders/update-order/${item._id}`)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>
                          <button
                            className="ml-4 rounded bg-red-500 px-3 py-1 text-white"
                            onClick={() => handleSubmit(item._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
