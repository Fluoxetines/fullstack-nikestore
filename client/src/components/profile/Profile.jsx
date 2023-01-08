import axios from "axios";
import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

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

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { id: userID } = useParams();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: true,
  });

  const handleSubmit = async () => {
    if (
      (password !== confirmPassword && password === "") ||
      confirmPassword === ""
    ) {
      toast.error("Update Failed !");
    } else {
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
        window.location.reload(false);
      } catch (err) {
        console.log(err);
        dispatch({ type: "UPDATE_FAIL" });
      }
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      let result = await fetch(`/api/users/${userID}`);
      result = await result.json();
      setName(result.name);
      setEmail(result.email);
    };
    getUserDetails();
  }, [userID]);

  return (
    <>
      {loading && (
        <div className="profile rounded bg-[#4a4354] p-5 ">
          <div className="flex flex-col items-center justify-center">
            <div className="profile-input px-4">
              <input
                type="text"
                placeholder="Name"
                className="form_input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                className="form_input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="form_input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="form_input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div>
                <button
                  className="m-2 h-14 w-full rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center text-white"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
