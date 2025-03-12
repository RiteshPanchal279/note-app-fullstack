import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFunction } from "../store/noteSlice";
import { MdLightMode, MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggle = useSelector((state) => state.note.toggleBtn);
  const user =localStorage.getItem('user')

  const handleLogout = async ()=>{
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if(res.data.success){
        dispatch(setUser(null))
        localStorage.removeItem('user')
        navigate('/user/login')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className={`text-4xl ${toggle ? "text-white " : "text-black"}`}>
        NOTE
      </h1>
      <div className="flex gap-3">
      {/* {JSON.stringify(user)} */}
        {!user ? (
          <>
            <button
              className="border px-3 bg-gray-400 rounded-lg hover:scale-[1.1] transition duration-300 ease-in-out"
              onClick={() => navigate("/user/login")}
            >
              Login
            </button>
            <button
              className="border px-3 bg-gray-400 rounded-lg hover:scale-[1.1] transition duration-300 ease-in-out"
              onClick={() => navigate("/user/register")}
            >
              Sing Up
            </button>
          </>
        ) : (
          <button className="border px-3 bg-gray-400 rounded-lg hover:scale-[1.1] transition duration-300 ease-in-out" onClick={handleLogout}>
            Logout
          </button>
        )}

        <button
          className={`border-2 px-3 py-1 rounded-full ${
            toggle ? "text-white " : "text-black"
          }   `}
          onClick={() => {
            dispatch(toggleFunction());
          }}
        >
          {toggle ? (
            <MdOutlineLightMode className="text-xl" />
          ) : (
            <MdLightMode className="text-xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
