import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Reset = ({ history }) => {
  const handleLink = () => {
    history.push("/");
  };

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center bg-[#1d1926]">
      <Link to="/" className="mb-[4em] rounded-full p-[2em]">
        <img src={logo} className="h-auto max-w-[100px]" alt="" />
      </Link>
      <form>
        <input
          className="my-2  block w-[370px] rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          type="password"
          placeholder="Password"
        />
        <input
          className="my-2  block w-[370px] rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          type="password"
          placeholder="Confirm Password"
        />
        <button
          onClick={handleLink}
          className="h-11 w-full rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center text-white"
        >
          Login ?
        </button>
      </form>
    </div>
  );
};

export default Reset;
