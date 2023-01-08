import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      navigate("/");
    }
  }, [navigate]);

  function handleLogin() {
    const users = {
      email,
      password,
    };
    dispatch(login(users));
  }

  const { currentUser } = useSelector((state) => state.loginUserReducer);
  if (currentUser) {
    navigate("/");
  }

  return (
    <>
      <div className="flex h-[100vh] flex-col items-center justify-center bg-[#1d1926]">
        <Link to="/" className="mb-[4em] rounded-full p-[2em]">
          <img src={logo} className="h-auto max-w-[100px]" alt="" />
        </Link>
        <div>
          <div className="max-w-[370px]">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
              className="block w-[370px] rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
              className="my-4 block w-[370px] rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
            <button
              className="my-2 h-11 w-full rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center capitalize text-white"
              onClick={handleLogin}
            >
              Login
            </button>

            <div className="mt-[2em] flex w-full max-w-[370px] justify-end px-1">
              <Link to="/register">
                <p className="cursor-pointer capitalize text-orange-400">
                  Register
                </p>
              </Link>
              {/* <Link to="/forgot-password">
                <p className="capitalize cursor-pointer text-purple-500">
                  forgot ?
                </p>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
