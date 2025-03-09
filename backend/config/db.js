import mongoose from "mongoose";

const dbConnect = async ()=>{
   const url = process.env.DATABASE_URL
   try {
      
      await mongoose.connect(url,{
         useNewUrlParser: true,
         useUnifiedTopology: true,
       })
      console.log('Database connected successfully');
      
   } catch (error) {
      console.log('mongodb connection error',err);
   }
} 
export default dbConnect;