import mongoose from "mongoose";

const dbConnect = async ()=>{
   const url = process.env.DATABASE_URL
   try {
      
      await mongoose.connect(url)
      console.log('Database connected successfully');
      
   } catch (err) {
      console.log('mongodb connection error',err);
   }
} 
export default dbConnect;