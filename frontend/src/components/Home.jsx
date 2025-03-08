import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import NoteList from "./NoteList";
import Search from "./Search";

const Home = () => {
  const toggle = useSelector((state) => state.note.toggleBtn);

  return (
    <div className={`min-h-screen ${toggle ? "bg-black " : "bg-white "}`}>
      <div className="p-4 sm:max-w-[1060px] mx-auto px-[15px]">
        <Navbar />
        <Search />
        <NoteList />
      </div>
    </div>
  );
};

export default Home;
