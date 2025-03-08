import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
   },
   text:{
      type:String,
      required:true,
   },
   date:{
      type:Date,
      default:Date.now,
   },
})

export const Note = mongoose.model('Note',noteSchema)