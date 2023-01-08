import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import { getAllProduct } from "../redux/actions/productAction";
import { StarIcon } from "@heroicons/react/24/outline";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;
  const { products } = useSelector((state) => state.getAllProduct);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);

      setProduct([data]);
    };

    fetchProduct();
  }, [id]);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      <div className="fixed z-10 h-[75px] w-full bg-black">
        <Navbar />
      </div>
      <div className="nike-container pt-[200px]">
        {product.map((products) => (
          <div className="row">
            <div className="col-lg-6">
              <div className="relative h-[400px] max-w-[500px] rounded-[15px] bg-[#ebebeb]">
                <img
                  src={products.image.url}
                  alt=""
                  className="absolute top-[50%] left-[50%] h-[350px] w-[350px] translate-x-[-50%] translate-y-[-50%] object-contain"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <h1 className="text-[28px] font-semibold">{products.name}</h1>
              <h2 className="my-3 text-[18px]">{products.description}</h2>
              <h3 className="flex items-center text-[20px]">
                Rating : {products.rating}{" "}
                <StarIcon className="ml-2 h-5 w-5 text-orange-500 md:h-4 md:w-4" />
              </h3>
              <h2 className="my-3 text-[20px] font-medium">
                Price :
                <span className="ml-3 font-semibold text-red-600">
                  ${products.price}
                </span>
              </h2>
              <div className="mt-[50px] flex items-center gap-4">
                <button
                  className="border border-solid border-[#f02d34] px-[47px] py-[13px] text-[18px] font-medium text-[#f02d34] transition-all duration-500 hover:scale-110"
                  onClick={() => handleAddToCart(products)}
                >
                  Add To Cart
                </button>
                <Link to="/cart">
                  <button
                    className="w-[200px] bg-[#f02d34] px-[47px] py-[13px] text-[18px] font-medium text-white transition-all duration-500 hover:scale-110"
                    onClick={() => handleAddToCart(products)}
                  >
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="nike-container pt-[100px]">
        <h2 className="mb-[80px] text-center text-[30px] font-medium text-[#324d67]">
          You may also like
        </h2>
        <div className="marquee">
          <div className="track">
            {products.slice(0, 8).map((slides) => (
              <div>
                <Link to={`/product-details/${slides._id}`}>
                  <div className="relative h-[300px] w-[300px] cursor-pointer rounded-[15px] bg-[#ebebeb]">
                    <img
                      src={slides.image.url}
                      alt=""
                      className="absolute top-[50%] left-[50%] h-[250px] w-[250px] translate-x-[-50%] translate-y-[-50%] rounded-[15px] object-contain"
                    />
                  </div>
                  <p className="text-[18px] text-[#324d67]">{slides.name}</p>
                  <p className="text-[18px] font-semibold">${slides.price}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
