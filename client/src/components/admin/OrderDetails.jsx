import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./index.scss";
import Sidebar from "./Sidebar";

const OrderDetails = () => {
  const [data, setData] = useState([]);
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
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item) => (
                  <>
                    <tr key={item._id}>
                      <td className="max-w-[200px] whitespace-pre-wrap lg:max-w-full">
                        {item.orderID}
                      </td>
                      <td>{item.productID}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
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
