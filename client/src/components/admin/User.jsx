import axios from "axios";
import React, { useState, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_REQUEST":
      return { ...state, loading: true };
    case "DELETE_SUCCESS":
      return { ...state, loading: false };
    case "DELETE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const User = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { id: userID } = params;

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: true,
  });

  const handleSubmit = async (id) => {
    const index = users.findIndex((e) => e._id === id);
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/users/${users[index]._id}`, {
        _id: userID,
      });
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("User Delete Successfully !");
      window.location.reload(false);
    } catch (err) {
      console.log(err);
      dispatch({ type: "DELETE_FAIL" });
      toast.error("User Delete Failed !");
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/api/users`);
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {loading && (
        <>
          <div className="fixed z-20 h-[75px] w-full bg-black">
            <Navbar />
          </div>
          <Sidebar />
          <>
            <div>
              <div className="w-[95%] pl-[300px] pt-[200px] md:w-full md:px-5">
                <h1 className="mb-5 text-2xl">Users</h1>
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value)}
                    className="mb-4 min-w-[300px] rounded-[6px] bg-[#f2f2f2] px-4 py-3 placeholder-black/50 focus:outline-none"
                  />
                  <button
                    onClick={() => navigate("/register")}
                    className="mr-2 rounded bg-green-500 px-3 py-1 text-white"
                  >
                    Add User
                  </button>
                </div>
                <table className="table-users">
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Email</td>
                      <td>Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter((key) => {
                        if (query === "") {
                          return key;
                        } else if (
                          key.name.toLowerCase().includes(query.toLowerCase())
                        ) {
                          return key;
                        } else if (
                          key.email.toLowerCase().includes(query.toLowerCase())
                        ) {
                          return key;
                        }
                      })
                      .map((item) => (
                        <tr>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>
                            <div className="flex items-center">
                              <button
                                onClick={() =>
                                  navigate(
                                    `/admin/users/update-user/${item._id}`
                                  )
                                }
                                className="rounded bg-blue-400 px-3 py-1 text-white"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </button>
                              <button
                                className="ml-4 rounded bg-red-500 px-3 py-1 text-white"
                                onClick={() => handleSubmit(item._id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
};

export default User;
