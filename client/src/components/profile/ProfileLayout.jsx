import React from "react";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import Protected from "../Protected";
import Navbar from "../Navbar";
const ProfileLayout = () => {
  const { currentUser } = useSelector((state) => state.loginUserReducer);

  return (
    <>
      {currentUser ? (
        <>
          <Navbar />
          <div className="nike-container fixed z-20 flex h-screen w-full items-center justify-center bg-[#1d1926]">
            <Profile />
          </div>
        </>
      ) : (
        <>
          <Protected />
        </>
      )}
    </>
  );
};

export default ProfileLayout;
