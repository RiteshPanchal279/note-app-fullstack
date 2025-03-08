import { Note } from "../models/notes_model.js";

export const addNote = async (req,res)=>{

   try {
      const {text}=req.body;
      const userId = req.id;// Authenticated user ID

      if(!text){
         return res.status(400).json({
            message: "content missing",
            success: false,
         });
      }
      const note = await Note.create({
         text,
         date:new Date(),
         user:userId
      })
      return res.status(201).json({
         message:"New Note created Successfuly",
         note,
         success:true
      })
   } catch (err) {
      console.log('addNote error:',err);
   }
   
}

export const getNote = async(req,res)=>{
   try {
      const userId = req.id;// Authenticated user ID

      // Find all notes created by the logged-in user
      const notes = await Note.find({ user: userId }).sort({ date: -1 }); // Sort by latest

      return res.status(200).json({
         message: "Notes fetched successfully",
         notes,
         success: true,
      });
   } catch (err) {
      console.log("getNote error:", err);
      return res.status(500).json({ message: "Server error", success: false });
   }
}

export const deleteNote=async (req,res)=>{
   try {
      const noteId = req.params.id; // Get note ID from request parameters
      const userId = req.id; // Authenticated user ID

      // Find the note to check ownership
      const note = await Note.findOne({ _id: noteId, user: userId });

      if (!note) {
         return res.status(404).json({
            message: "Note not found or you don't have permission to delete it",
            success: false,
         });
      }

      // Delete the note
      await Note.deleteOne({ _id: noteId });

      return res.status(200).json({
         message: "Note deleted successfully",
         success: true,
      });
   } catch (err) {
      console.log("deleteNote error:", err);
      return res.status(500).json({ message: "Server error", success: false });
   }
}

export const updateNote = async (req, res) => {
   try {
      const noteId = req.params.id; // Get note ID from request parameters
      const userId = req.id; // Authenticated user ID
      const { text } = req.body; // Get updated text from request body

      if (!text) {
         return res.status(400).json({
            message: "Content missing",
            success: false,
         });
      }

      // Find the note and ensure it belongs to the authenticated user
      const note = await Note.findOne({ _id: noteId, user: userId });

      if (!note) {
         return res.status(404).json({
            message: "Note not found or you don't have permission to update it",
            success: false,
         });
      }

      // Update the note's text and date
      note.text = text;
      note.date = new Date(); // Update timestamp
      await note.save();

      return res.status(200).json({
         message: "Note updated successfully",
         note,
         success: true,
      });
   } catch (err) {
      console.log("updateNote error:", err);
      return res.status(500).json({ message: "Server error", success: false });
   }
};