import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const ForgotPassword = () => {
  return (
    <div className="flex h-[100vh] flex-col items-center justify-center bg-[#1d1926]">
      <Link to="/" className="mb-[4em] rounded-full p-[2em]">
        <img src={logo} className="h-auto max-w-[100px]" alt="" />
      </Link>
      <form>
        <input
          type="text"
          placeholder="Email"
          className="block w-[370px] rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
        <button className="my-4 h-11 w-full rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center text-white">
          Send
        </button>
        <div className="mt-[2em] flex w-full max-w-[370px] justify-between px-1">
          <Link to="/register">
            <p className="cursor-pointer capitalize text-orange-400">
              Register
            </p>
          </Link>
          <Link to="/login">
            <p className="cursor-pointer capitalize text-purple-500">Login ?</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
