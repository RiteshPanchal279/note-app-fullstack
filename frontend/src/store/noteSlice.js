import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
   name:"note",
   initialState:{
      notes:[],
      searchText:"",
      toggleBtn:false
   },
   
   reducers:{
      addNote:(state,action)=>{
         state.notes.push(action.payload);
      },
      getAllNote:(state,action)=>{
         state.notes = action.payload
      },
      deleteNote: (state, action) => {
         state.notes = state.notes.filter(note => note._id !== action.payload); 
      },
      getSearchText:(state,action)=>{
         state.searchText=action.payload
      },
      toggleFunction:(state)=>{
         state.toggleBtn= !state.toggleBtn
      },
      updateNoteInStore: (state, action) => {
         const { id, text } = action.payload;
         const noteIndex = state.notes.findIndex(note => note._id === id);
         if (noteIndex !== -1) {
           state.notes[noteIndex].text = text;
         }
       },
       toggleFunction:(state)=>{
         state.toggleBtn= !state.toggleBtn
      }
   },

});

export const {addNote,deleteNote,getSearchText,toggleFunction,getAllNote,updateNoteInStore} = noteSlice.actions;
export const noteReducer = noteSlice.reducer; 
