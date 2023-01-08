import axios from "axios";
import React, { useEffect, useState, useReducer } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loading: true };
    case "UPDATE_SUCCESS":
      return { ...state, loading: false };
    case "UPDATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const UpdateUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const params = useParams();
  const { id: userID } = params;

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: true,
  });

  const handleSubmit = async () => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/users/${userID}`, {
        name,
        email,
        password,
        isAdmin: false,
      });
      toast.success("Update Users Successfully");
      dispatch({ type: "UPDATE_SUCCESS" });
      navigate("/admin/users");
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      let result = await fetch(`/api/users/${params.id}`);
      result = await result.json();
      setName(result.name);
      setEmail(result.email);
    };
    getUserDetails();
  }, [params.id]);

  return (
    <>
      {loading && (
        <>
          <div className="fixed z-20 h-[75px] w-full bg-black">
            <Navbar />
          </div>
          <Sidebar />
          <div className="w-[95%] pl-[300px] md:w-full md:pl-[20px]">
            <form
              onSubmit={handleSubmit}
              className="nike-container flex min-h-screen flex-col items-center justify-center"
            >
              <div className="flex w-full items-start justify-between lg:flex-col md:flex-col">
                <div className="flex flex-col">
                  <h3 className="mb-4 text-2xl">Update User</h3>
                  <span>Name</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="my-2 min-w-[300px] rounded-md border border-solid border-slate-500 p-4"
                  />
                  <span>Email</span>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="my-2 min-w-[300px] rounded-md border border-solid border-slate-500 p-4"
                  />
                  <span>Password</span>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="my-2 min-w-[300px] rounded-md border border-solid border-slate-500 p-4"
                  />

                  <button className="my-2 h-11 w-full rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center capitalize text-white">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateUser;
