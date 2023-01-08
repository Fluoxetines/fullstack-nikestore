import React from "react";
import { Link } from "react-router-dom";
import blob from "../assets/blob.png";

const NotFound = () => {
  return (
    <>
      <div className="min-h-screen w-full bg-[#242424]">
        <img
          src={blob}
          alt=""
          className="absolute bottom-0 right-0 sm:hidden xsm:hidden"
        />
        <div className="flex min-h-screen w-full flex-col items-center justify-center text-center">
          <h1 className="text-[200px] font-bold leading-[200px] text-[#6A63FE] xsm:text-[100px] xsm:leading-[100px]">
            404
          </h1>
          <h3 className="text-[35px] font-bold text-white sm:text-[28px] xsm:text-[28px]">
            Oops, you’ve lost in space
          </h3>
          <span className="mb-[60px] text-[24px] leading-[42px] text-white sm:text-[20px] xsm:text-[18px]">
            We can’t find the page that you’re looking for
          </span>
          <Link to="/">
            <button className="rounded-[60px] bg-[#6a63fe] p-[16px_72px] text-white">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
