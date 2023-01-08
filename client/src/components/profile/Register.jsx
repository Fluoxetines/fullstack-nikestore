import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import toast from "react-hot-toast";
import { register } from "../../redux/actions/userActions";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleRegister() {
    if (password !== confirmPassword) {
      toast.error("Password not correct !");
    } else {
      const users = {
        name,
        email,
        password,
      };
      dispatch(register(users));
      navigate("/login");
    }
  }

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center bg-[#1d1926]">
      <Link to="/" className="mb-[4em] rounded-full p-[2em]">
        <img src={logo} className="h-auto max-w-[100px]" alt="" />
      </Link>
      <div>
        <input
          className="my-4 block w-[370px] rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          className="my-4 block w-[370px] rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="my-4 block w-[370px] rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          className="my-4 block w-[370px] rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <button
          className="my-2 h-11 w-full rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center capitalize text-white"
          onClick={handleRegister}
        >
          Register
        </button>
        <div className="mt-[2em] flex w-full max-w-[370px] justify-end px-1">
          <Link to="/login">
            <p className="cursor-pointer capitalize text-orange-400">Login</p>
          </Link>
          {/* <Link to="/forgot-password">
            <p className="capitalize cursor-pointer text-purple-500">
              forgot ?
            </p>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
