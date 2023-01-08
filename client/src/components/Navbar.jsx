import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { getTotals } from "../redux/reducer/cartReducer";
import { logout } from "../redux/actions/userActions.js";
const Navbar = () => {
  const [navState, setNavState] = useState(false);
  const cartState = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.loginUserReducer);

  const handleLogout = () => {
    dispatch(logout());
  };

  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);

    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(getTotals());
  });
  return (
    <>
      <header
        className={
          !navState
            ? "absolute top-7 left-0 right-0 z-50 opacity-100"
            : "fixed top-0 left-0 right-0 z-[200] flex h-[9vh] items-center justify-center bg-black text-white opacity-100"
        }
      >
        <nav className="nike-container flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="logo/img" className={`h-auto w-16`} />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {currentUser && currentUser.isAdmin && (
              <ul className="flex items-center justify-center gap-2">
                <Link to="/" className="group relative py-1">
                  <h3 className={`text-md flex items-center text-white`}>
                    {currentUser.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="ml-1 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </h3>
                  <div
                    className="absolute top-7 right-0 z-50 hidden min-w-[150px] rounded bg-gray-100 p-5 text-black shadow-2xl drop-shadow-2xl group-hover:block
                "
                  >
                    <Link to={`/profile/${currentUser._id}`} className="block">
                      Profile
                    </Link>
                    <Link to="/admin">Dashboard</Link>
                    <button
                      type="button"
                      className="relative w-full border-none text-left text-black outline-none transition-all duration-300 active:scale-110"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </button>
                  </div>
                </Link>
              </ul>
            )}

            {currentUser && !currentUser.isAdmin ? (
              <ul className="flex items-center justify-center gap-2">
                <Link to="/" className="group relative py-1">
                  <h3 className={`text-md flex items-center text-white`}>
                    {currentUser.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="ml-1 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </h3>
                  <div
                    className="absolute top-7 right-0 z-50 hidden min-w-[150px] rounded bg-gray-100 p-5 text-black shadow-2xl drop-shadow-2xl group-hover:block
                "
                  >
                    <Link to={`/profile/${currentUser._id}`} className="block">
                      Profile
                    </Link>
                    <button
                      type="button"
                      className="relative w-full border-none text-left text-black outline-none transition-all duration-300 active:scale-110"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </button>
                  </div>
                </Link>
              </ul>
            ) : null}

            {currentUser?.name ? null : (
              <li className="grid items-center">
                <Link to="/login">
                  <button
                    type="button"
                    className={`relative border-none outline-none transition-all duration-300 active:scale-110 ${
                      navState ? "text-white" : "text-white"
                    }`}
                  >
                    Login
                  </button>
                </Link>
              </li>
            )}
            <Link to="/cart" className="grid items-center">
              <button
                type="button"
                className="relative border-none outline-none transition-all duration-300 active:scale-110"
              >
                <ShoppingBagIcon
                  className={`icon-style ${
                    navState
                      ? "text-slate-100 transition-all duration-300"
                      : "text-slate-200"
                  } `}
                />
                <div
                  className={`absolute top-4 right-0 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full text-[0.65rem] font-medium leading-tight shadow transition-all duration-300 hover:scale-110 ${
                    navState
                      ? "bg-slate-100 text-slate-900 shadow-slate-100"
                      : "bg-slate-100 text-slate-900 shadow-slate-100"
                  }`}
                >
                  {cartState.cartItems.length}
                </div>
              </button>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
