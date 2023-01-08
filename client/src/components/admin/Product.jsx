import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllProduct } from "../../redux/actions/productAction";
import Navbar from "../Navbar";
import "./index.scss";
import Sidebar from "./Sidebar";

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    default:
      return state;
  }
};

const Product = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const params = useParams();
  const { id: productID } = params;
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: true,
  });
  const dispatches = useDispatch();
  const { products } = useSelector((state) => state.getAllProduct);

  const handleSubmit = async (id) => {
    const index = products.findIndex((e) => e._id === id);
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/products/${products[index]._id}`, {
        _id: productID,
      });
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("Product Delete Successfully !");
      window.location.reload(false);
    } catch (err) {
      console.log(err);
      dispatch({ type: "DELETE_FAIL" });
    }
  };
  useEffect(() => {
    dispatches(getAllProduct());
  }, [dispatches]);

  return (
    <>
      {loading && (
        <>
          <div className="fixed z-20 h-[75px] w-full bg-black">
            <Navbar />
          </div>
          <Sidebar />
          <>
            <div className="w-[95%] pl-[300px] pt-[200px] md:w-full md:pl-[20px]">
              <h1 className="mb-5 text-2xl">Products</h1>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setQuery(e.target.value)}
                  className="mb-4 min-w-[300px] rounded-[6px] bg-[#f2f2f2] px-4 py-3 placeholder-black/50 focus:outline-none"
                />
                <button
                  onClick={() => navigate("/admin/products/create-product")}
                  className="mr-2 rounded bg-green-500 px-3 py-1 text-white"
                >
                  Add Product
                </button>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="table-product">
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Description</td>
                      <td>Price</td>
                      <td>Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 &&
                      products
                        .filter((product) => {
                          if (query === "") {
                            return product;
                          } else if (
                            product.name
                              .toLowerCase()
                              .includes(query.toLowerCase())
                          ) {
                            return product;
                          } else if (
                            product.description
                              .toLowerCase()
                              .includes(query.toLowerCase())
                          ) {
                            return product;
                          }
                        })
                        .map((item) => (
                          <tr>
                            <td>
                              <div className="flex items-center gap-x-3">
                                <img
                                  src={item.image?.url}
                                  className="h-auto w-[60px] flex-shrink-0"
                                  alt=""
                                />
                                <span className="max-w-[200px] truncate">
                                  {item.name}
                                </span>
                              </div>
                            </td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>
                              <div className="flex items-center">
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/admin/products/update-product/${item._id}`
                                    )
                                  }
                                  className="rounded bg-blue-400 px-3 py-1 text-white"
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
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
};

export default Product;
