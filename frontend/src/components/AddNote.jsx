import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../store/noteSlice";
import axios from "axios";
import { NOTE_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { IoIosAddCircleOutline } from "react-icons/io";

const AddNote = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const charLimit = 200;
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${NOTE_API_END_POINT}/addnote`,
        { text, id: user?._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(addNote(res.data.note));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Error adding note.");
      console.log(error);
    }
    if (text.trim().length === 0) return;
    setText("");
  };

  const handleText = (e) => {
    if (charLimit - e.target.value.length >= 0) {
      setText(e.target.value);
    }
  };
  return (
    <div className="flex flex-col bg-[#66B2FF] mb-1.5 rounded-xl p-3 sm:min-h-60 min-h-40 justify-between">
      <form onSubmit={handleAdd}>
        <textarea
          rows="8"
          cols={10}
          placeholder="Type to add a note. . ."
          className="resize-none outline-none w-full"
          value={text}
          onChange={handleText}
          required
        ></textarea>
        <div className="flex items-center justify-between">
          <small className="text-[14px]">
            {charLimit - text.length} Remaining
          </small>
          <div type="submit" className="flex gap-1 items-center border-2 text-xl px-3 border-dashed font-bold rounded-full cursor-pointer  bg-white hover:bg-[#88f276] ">
            <IoIosAddCircleOutline className="text-2xl " />
            <button  className="cursor-pointer">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
