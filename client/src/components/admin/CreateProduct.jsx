import axios from "axios";
import React, { useState, useReducer } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const CreateProduct = () => {
  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: true,
  });

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: "CREATE_REQUEST" });
      await axios.post("/api/products", {
        name,
        description,
        rating,
        price,
        image: productImg,
      });
      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Product created successfully !");
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
      dispatch({ type: "CREATE_FAIL" });
    }
  };
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
                  <h3 className="mb-4 text-2xl">Create Product</h3>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="my-2 min-w-[300px] rounded-md border border-solid border-slate-500 p-4"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="my-2 min-w-[300px] rounded-md border border-solid border-slate-500 p-4"
                  />
                  <input
                    type="text"
                    placeholder="Rating"
                    onChange={(e) => setRating(e.target.value)}
                    required
                    className="my-2 min-w-[300px] rounded-md border border-solid border-slate-500 p-4"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="my-2 min-w-[300px] rounded-md border border-solid border-slate-500 p-4"
                  />
                  <input
                    type="file"
                    id="imgUpload"
                    accept="image/*"
                    onChange={handleProductImageUpload}
                    required
                    className="my-2 min-w-[300px] rounded-md border border-solid border-slate-500 p-4"
                  />
                  <button className="my-2 h-11 w-full rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center capitalize text-white">
                    Submit
                  </button>
                </div>
                <div className="rounded-md border border-solid border-slate-500 p-4">
                  {productImg ? (
                    <>
                      <img
                        src={productImg}
                        alt="error !"
                        className="h-[400px] w-[400px] object-contain"
                      />
                    </>
                  ) : (
                    <p className="text-center">
                      Image upload preview successfully.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default CreateProduct;
