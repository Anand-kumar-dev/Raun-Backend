import dotenv from "dotenv"
import jwt from "jsonwebtoken";
import client from "../config/redis.config.js";
dotenv.config()


export const verifyToken = async (req, res, next) => {

  try {
    const accessToken = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!accessToken) return res.status(200).json({ mes: "you are not authorize to see this webpage" })

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const invalidatedtoken = await client.get(decoded.id);
    
    if (invalidatedtoken === accessToken) return res.status(401).json({ mes: "invalidated token Unauthorize" })
  req.user = decoded;
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ mes: "Unauthorize" })
  }
}