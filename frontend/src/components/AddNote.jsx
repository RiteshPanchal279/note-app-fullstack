import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { addNote } from "../store/noteSlice";
import axios from "axios";
import { NOTE_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";

const AddNote = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const charLimit = 200;

  const handleAdd =  async(e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${NOTE_API_END_POINT}/addnote`,{text},{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,})

        if(res.data.success){
          dispatch(addNote(res.data.note))
          toast.success(res.data.success)
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
      <form onSubmit={handleAdd} >
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
        <button
          className="border-1 px-3.5 rounded-full bg-white hover:bg-[#c8dcf0] cursor-pointer"
          type="submit"
        >
          Add
        </button>
      </div>
      </form>
    </div>
  );
};

export default AddNote;
