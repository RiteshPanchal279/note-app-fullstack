import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteNote, updateNoteInStore } from "../store/noteSlice";
import { toast } from "sonner";
import { NOTE_API_END_POINT } from "../utils/constant";

const Note = ({ id, text, date }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${NOTE_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(deleteNote(id));
        toast.success("Note Deleted Successfully!");
      }
    } catch (error) {
      console.log("Error deleting note:", error);
      toast.error("Failed to delete note!");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${NOTE_API_END_POINT}/update/${id}`,
        { text: newText },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(updateNoteInStore({ id, text: newText }));
        toast.success("Note updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.log("Error updating note:", error);
      toast.error("Failed to update note!");
    }
  };

  return (
    <div className="flex flex-col bg-[#fef68a] mb-1.5 rounded-xl p-3 sm:min-h-60 min-h-40 justify-between whitespace-pre-wrap">
      {isEditing ? (
        <textarea
          className="w-full p-2  rounded-md focus:outline-none "
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span className="break-words">{text}</span>
      )}

      <div className="flex items-center justify-between">
        <small className="text-[15px] font-medium">{date}</small>
        <div className="flex gap-4 items-center">
          {isEditing ? (
            <>
              <button
                className="bg-green-500 rounded px-2 cursor-pointer"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="bg-red-500 px-2 rounded cursor-pointer"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <div className="flex items-center border px-2 bg-blue-500 rounded cursor-pointer" onClick={() => setIsEditing(true)}>
              <FiEdit  />
              <p>Edit</p>
            </div>
          )}
          <div className="flex items-center border px-2 bg-red-600 rounded cursor-pointer" onClick={handleDelete}>
            <RiDeleteBin6Line />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
