import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);

  const getAllUser = async () => {
    try {
      const { data } = await axios.get(`/api/users`);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllOrder = async () => {
    try {
      const { data } = await axios.get(`/api/orders`);
      setOrder(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products`);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    /* function updateMoney() {
      let total = 0;
      for (let i = 0; i < order.length; i++) {
        total +=
          order[i].orderItems[0].cartQuantity * order[i].orderItems[0].price;
      }
      setTotalMoney(total);
    } */
    getAllUser();
    getAllProduct();
    getAllOrder();
    /* updateMoney(); */
  }, []);

  return (
    <>
      <div className="fixed z-20 h-[75px] w-full bg-black">
        <Navbar />
      </div>
      <Sidebar />
      <div className="w-full pl-[200px] pt-[200px] md:w-full md:pl-[20px]">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 lg:mb-4">
              <div className="rounded-xl bg-[#E7E6FB] p-6">
                <div className="relative flex items-center">
                  <div className="relative h-10 w-10 flex-shrink-0 rounded-full bg-[#5B68FF]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="absolute top-[50%] left-[50%] h-6 w-6 flex-shrink-0 translate-x-[-50%] translate-y-[-50%] text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4 flex flex-col items-start">
                    <h2 className="text-base font-medium">Total Orders</h2>
                    <span>{order.length}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 lg:mb-4">
              <div className="rounded-xl bg-[#E7E6FB] p-6">
                <div className="relative flex items-center">
                  <div className="relative h-10 w-10 flex-shrink-0 rounded-full bg-[#5B68FF]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="absolute top-[50%] left-[50%] h-6 w-6 flex-shrink-0 translate-x-[-50%] translate-y-[-50%] text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4 flex flex-col items-start">
                    <h2 className="text-base font-medium">Total Products</h2>
                    <span>{products.length}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 lg:mb-4">
              <div className="rounded-xl bg-[#E7E6FB] p-6">
                <div className="relative flex items-center">
                  <div className="relative h-10 w-10 flex-shrink-0 rounded-full bg-[#5B68FF]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="absolute top-[50%] left-[50%] h-6 w-6 flex-shrink-0 translate-x-[-50%] translate-y-[-50%] text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4 flex flex-col items-start">
                    <h2 className="text-base font-medium">Total Users</h2>
                    <span>{user.length}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 lg:mb-4">
              <div className="rounded-xl bg-[#E7E6FB] p-6">
                <div className="relative flex items-center">
                  <div className="relative h-10 w-10 flex-shrink-0 rounded-full bg-[#5B68FF]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="absolute top-[50%] left-[50%] h-6 w-6 flex-shrink-0 translate-x-[-50%] translate-y-[-50%] text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4 flex flex-col items-start">
                    <h2 className="text-base font-medium">
                      Total Order Amount
                    </h2>
                    <span>{totalMoney}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
