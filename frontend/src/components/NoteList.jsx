import React, { useEffect } from "react";
import Note from "./Note";
import AddNote from "./AddNote";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllNote } from "../store/noteSlice";
import { NOTE_API_END_POINT } from "../utils/constant";

const NoteList = () => {
  const dispatch = useDispatch();
  const user=JSON.parse(localStorage.getItem('user')) || null

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.post(`${NOTE_API_END_POINT}/getnote`, {user},{
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(getAllNote(res.data.notes));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchNote();
  }, []);

  const notes = useSelector((store) => store.note.notes);
  const searchText = useSelector((state) => state.note.searchText);
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-2">
      <AddNote />
      {notes.filter((val) => {
          if (searchText == "") {
            return val;
          } else if (
            val.text.toLowerCase().includes(searchText.toLowerCase())
          ) {
            return val;
          }
        })
        .map((note) => (
          <Note
            key={note._id}
            id={note._id}
            text={note.text}
            date={note?.date?.split("T")[0]}
          />
        ))}
    </div>
  );
};

export default NoteList;
