import React from "react";

const ActiveLayout = ({ history }) => {
  const handleClick = () => {
    history.push("/login");
  };

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center bg-[#1d1926]">
      <p className="text-xl capitalize text-yellow-300">
        Ready to login ?
        <span
          onClick={handleClick}
          className="ml-4 cursor-pointer text-purple-400"
        >
          Here
        </span>
      </p>
    </div>
  );
};

export default ActiveLayout;
