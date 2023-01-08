import React from "react";
import { BiUserCircle, BiLogOut } from "react-icons/bi";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  return (
    <>
      <div className="z-10 flex min-w-[280px] flex-shrink-0 justify-center p-12">
        <ul className="m-auto w-full min-w-[200px] rounded bg-[#4a4354]">
          {user?.name && (
            <>
              <li className="ml-4 flex cursor-pointer list-none items-center py-3 text-white">
                <h3>{user.name}</h3>
                <BiUserCircle className="h-6 w-6" />
                <p className="ml-4 text-sm uppercase tracking-wider">profile</p>
              </li>
              <li className="ml-4 flex cursor-pointer list-none items-center py-3 text-white">
                <BiLogOut className="h-6 w-6" />
                <p className="ml-4 text-sm uppercase tracking-wider">logout</p>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
