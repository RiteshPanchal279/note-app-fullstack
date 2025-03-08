import jwt from "jsonwebtoken"

const isAuthenticated = async (req,res,next)=>{
   try {
      const token = req.cookies?.token; // to use cookies we have to install cookie-parser and add in to server.js file
      if(!token){
         return res.status(401).json({
            message:"user not authenticated",
            success:false,
         })
      }
      const decode=await jwt.verify(token,process.env.SECRET_KEY);
      if(!decode){
         return res.status(401).json({
            message:"Invalid token",
            success:false,
         })
      }
      req.id=decode.userId;
      next();
   } catch (error) {
      console.log(error);   
   }
}

export default isAuthenticated;