import dotenv from "dotenv"
dotenv.config()
import jwt, { decode } from "jsonwebtoken"


export const verifyToken = (req,res , next)=>{

  try {
     const accessToken = req.cookies.accessToken ||  req.header("Authorization")?.replace("Bearer ", "");
      if(!accessToken) return res.status(200).json({mes:"you are not authorize to see this webpage"})
  
     const decoded =  jwt.verify(accessToken, process.env.JWT_SECRET);
     
     req.user = decoded
      next()
  } catch (error) {
    console.log(error)
   return res.status(401).json({mes:"Unauthorize"})
  }
}