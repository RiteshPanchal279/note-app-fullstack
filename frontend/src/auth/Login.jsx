import React, { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading, setUser } from "../store/authSlice";
import { USER_API_END_POINT } from "../utils/constant.js";
import axios from "axios";
import { toast } from "sonner";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [toggleEye, setToggleEye] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        localStorage.setItem("user", JSON.stringify(res.data.user)); // Save user info in localStorage
        localStorage.setItem("token", res.data.token); // Save the token
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log("Login error", err);
      toast.error(err.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-5 font-mono  ">
      <h1 className="text-4xl sm:text-5xl text-blue-600 font-extrabold">
        My Note
      </h1>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl flex flex-col p-5 gap-3 shadow-2xl px-10 sm:min-w-[540px]"
      >
        <h2 className="text-center text-2xl font-semibold">Login</h2>
        <div className="flex flex-col">
          <label className="text-xl pb-1" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            required
            placeholder="Enter email..."
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className=" px-4 rounded outline-none bg-gray-300 py-2 "
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-xl pb-1">
            Password:
          </label>
          <div className="flex items-center bg-gray-300 rounded justify-between ">
            <input
              type={!toggleEye?"password":"text"}
              required
              name="password"
              className="px-4 bg-gray-300 outline-none py-2 rounded "
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter password..."
            />
            {!toggleEye ? (
              <FaRegEyeSlash className="mr-2 size-4 cursor-pointer" onClick={()=>setToggleEye(true)} />
            ) : (
              <FaRegEye className="mr-2 size-4 cursor-pointer" onClick={()=>setToggleEye(false)} />
            )}
          </div>
        </div>

        

        <div type="submit" className="flex items-center justify-center">
          {loading ? (
            <button className="text-center bg-blue-500 px-4 py-1 rounded-full cursor-pointer">
              Place Wait
            </button>
          ) : (
            <button className="text-center bg-blue-500 px-4 py-1 rounded-full cursor-pointer">
              Login
            </button>
          )}
        </div>

        <div>
          <p className="text-center text-[13px]">
            New user?
            <a
              className="text-blue-400 underline text-[15px]"
              href="/user/register"
            >
              SignUp
            </a>
          </p>
        </div>

      </form>
    </div>
  );
};

export default Login;
