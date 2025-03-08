import React from 'react'
import { FaSearch } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { getSearchText } from '../store/noteSlice';

const Search = () => {
   const dispatch = useDispatch();
  return (
    <div className='flex items-center bg-gray-300 p-1 mb-5 rounded'>
      <FaSearch className='ml-2'/>
      <input type="text" placeholder='Search...' className='outline-none w-full bg-gray-300 rounded px-2 ' onChange={(e)=>dispatch(getSearchText(e.target.value))} />
    </div>
  )
}

export default Search