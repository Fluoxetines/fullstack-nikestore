import React, { useEffect } from "react";
import FlexContent from "./FlexContent";
import Hero from "./Hero";
import Stories from "./Stories";
import { heroapi, highlight, sneaker, story } from "../components/data";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { StarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { getAllProduct } from "../redux/actions/productAction";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.getAllProduct);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <main className="relative flex flex-col gap-16">
        <Hero heroapi={heroapi} />
        <div className="nike-container">
          <h1
            className="text-5xl font-bold text-slate-900 drop-shadow-lg filter lg:text-4xl
         md:text-3xl"
          >
            Popular Sales
          </h1>
          <div className="mt-7 grid grid-cols-3 items-center justify-items-center gap-5 xl:grid-cols-2 lg:gap-5 sm:grid-cols-1">
            {products.slice(12, 15)?.map((item, i) => (
              <div
                key={item._id}
                className="product relative my-4 grid w-full items-center justify-items-start rounded-xl py-4 px-5 shadow-2xl transition-all duration-700 ease-in-out hover:scale-105"
              >
                <div className="grid items-center justify-items-start">
                  <h1 className="text-xl font-medium text-white drop-shadow filter lg:text-lg md:text-base">
                    {item.name}
                  </h1>
                  <p className="text-base font-normal text-white drop-shadow filter md:text-sm">
                    {item.description}
                  </p>

                  <div className="my-2 flex w-24 items-center justify-between">
                    <div className="blur-effect-theme flex items-center rounded bg-white px-1">
                      <h1 className="text-sm font-medium text-black">
                        ${item.price}
                      </h1>
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIcon className="icon-style h-5 w-5 md:h-4 md:w-4" />
                      <h1 className="font-normal text-white md:text-sm">
                        {item.rating}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="blur-effect-theme button-theme bg-white p-0.5 shadow shadow-sky-200"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingBagIcon className="icon-style text-slate-900" />
                    </button>
                    <Link to="/cart">
                      <button
                        type="button"
                        className="blur-effect-theme button-theme bg-white px-2 py-1 text-sm font-medium text-black shadow"
                        onClick={() => handleAddToCart(item)}
                      >
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="absolute top-5 right-1 flex items-center">
                  <Link to={`/product-details/${item._id}`}>
                    <img
                      src={item.image.url}
                      alt={item.title}
                      className="transitions-theme h-36 w-64 -rotate-[35deg] hover:-rotate-12 lg:w-56 md:w-48"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <FlexContent endpoint={highlight} ifExists />
        <div className="nike-container">
          <h1
            className="text-5xl font-bold text-slate-900 drop-shadow-lg filter lg:text-4xl
         md:text-3xl"
          >
            Top Rated Sales
          </h1>
          <div className="mt-7 grid grid-cols-4 items-center justify-items-center gap-5 xl:grid-cols-2 lg:gap-5 sm:grid-cols-1">
            {products.slice(0, 12)?.map((item, i) => (
              <div
                key={i}
                className="product-sales relative mb-4 grid w-full items-center justify-items-center rounded-xl py-4 px-5 shadow-2xl transition-all duration-700 ease-in-out hover:scale-105"
              >
                <div className="grid items-center justify-items-center">
                  <h1 className="text-xl font-medium text-white drop-shadow filter lg:text-lg md:text-base">
                    {item.name}
                  </h1>
                  <p className="text-base font-normal text-white drop-shadow filter md:text-sm">
                    {item.description}
                  </p>

                  <div className="my-2 flex w-24 items-center justify-between">
                    <div className="blur-effect-theme flex items-center rounded bg-white px-1">
                      <h1 className="text-md font-medium text-black">
                        ${item.price}
                      </h1>
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIcon className="icon-style h-5 w-5 md:h-4 md:w-4" />
                      <h1 className="font-normal text-white md:text-sm">
                        {item.rating}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="blur-effect-theme button-theme bg-white p-0.5 shadow shadow-sky-200"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingBagIcon className="icon-style text-slate-900" />
                    </button>
                    <Link to="/cart">
                      <button
                        type="button"
                        className="blur-effect-theme button-theme bg-white px-2 py-1 text-sm font-medium text-black shadow"
                        onClick={() => handleAddToCart(item)}
                      >
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Link to={`/product-details/${item._id}`}>
                    <img
                      src={item.image.url}
                      alt={item.title}
                      className="transitions-theme h-36 w-64 hover:-rotate-12 lg:w-56 md:w-48"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <FlexContent endpoint={sneaker} />
        <Stories story={story} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
