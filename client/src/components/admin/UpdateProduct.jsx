import axios from "axios";
import React, { useState, useReducer, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar";

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

const UpdateProduct = () => {
  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const { id: productID } = params;
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
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/products/${productID}`, {
        _id: productID,
        name,
        description,
        rating,
        price,
        image: productImg,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  useEffect(() => {
    const getProductDetails = async () => {
      let result = await fetch(`/api/products/${params.id}`);
      result = await result.json();
      setName(result.name);
      setDescription(result.description);
      setRating(result.rating);
      setPrice(result.price);
    };
    getProductDetails();
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
                  <h3 className="mb-4 text-2xl">Update Product</h3>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="my-2 min-w-[300px] rounded-md border border-solid border-slate-500 p-4"
                    name="name"
                  />
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="my-2 min-w-[300px] rounded-md border border-solid border-slate-500 p-4"
                    name="description"
                  />
                  <input
                    type="text"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                    className="my-2 min-w-[300px] rounded-md border border-solid border-slate-500 p-4"
                    name="rating"
                  />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="my-2 min-w-[300px] rounded-md border border-solid border-slate-500 p-4"
                    name="price"
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

export default UpdateProduct;
