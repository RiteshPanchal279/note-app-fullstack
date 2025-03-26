import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../store/authSlice";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../utils/constant.js";
import { useNavigate } from "react-router-dom";

const Signp = () => {
  const [toggleEye, setToggleEye] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    console.log(USER_API_END_POINT);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/user/login");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log("Signup error", err);
      toast.error(err.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-5 font-mono ">
      <h1 className="text-4xl sm:text-5xl text-blue-600 font-extrabold">
        My Note
      </h1>
      <form
        onSubmit={submitHandler}
        className="rounded-2xl flex flex-col p-5 gap-3 shadow-2xl px-10 sm:min-w-[540px]"
      >
        <h2 className="text-center text-2xl font-semibold">Sign Up</h2>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-xl pb-1">
            Fullname:
          </label>
          <div className="flex items-center bg-gray-300 rounded ">
            <input
              type="text"
              required
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              className="px-4 bg-gray-300 outline-none w-full py-2 rounded "
              placeholder="Enter fullname.."
            />
          </div>
        </div>
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
            className=" px-4 rounded outline-none bg-gray-300 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-xl pb-1">
            Password:
          </label>
          <div className="flex items-center bg-gray-300 rounded ">
            <input
              type={!toggleEye?"password":"text"}
              required
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="px-4 bg-gray-300 outline-none py-2 w-full rounded "
              placeholder="Enter password.."
            />
            {!toggleEye ? (
              <FaRegEyeSlash
                className="mr-2 size-4 cursor-pointer"
                onClick={() => setToggleEye(true)}
              />
            ) : (
              <FaRegEye
                className="mr-2 size-4 cursor-pointer"
                onClick={() => setToggleEye(false)}
              />
            )}
          </div>
        </div>

        <div>
          <p className="text-center text-[13px]">
            already have an account?
            <a
              className="text-blue-400 underline text-[15px]"
              href="/user/login"
            >
              Login
            </a>
          </p>
        </div>

        <div type="submit" className="flex items-center justify-center">
          {loading ? (
            <button className="text-center bg-blue-500 px-4 py-1 rounded-full cursor-pointer">
              Place Wait
            </button>
          ) : (
            <button className="text-center bg-blue-500 px-4 py-1 rounded-full cursor-pointer">
              Sign Up
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signp;
