import React from "react";
import { Link } from "react-router-dom";
import error from "../assets/401-error.png";
import { useSelector } from "react-redux";

const Protected = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <img src={error} alt="" className="h-[400px] w-[400px] flex-shrink-0" />
        <h2 className="my-3 text-3xl font-semibold text-[#BA68C8]">
          No authorization found
        </h2>
        <p className="text-sm text-gray-400">
          This page is not publically available.
        </p>
        <p className="text-sm text-gray-400">
          To access it please login first.
        </p>
        {user ? (
          <Link to="/">
            <button className="mt-5 h-11 w-[8.5rem] rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center text-white">
              Back to home
            </button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="mt-5 h-11 w-[8.5rem] rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center text-white">
              Login ?
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Protected;
