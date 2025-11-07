import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dbconnect from "./src/config/db.config.js"
import Authrouter from "./src/routes/auth.route.js"
import Userouter from "./src/routes/user.route.js"


const  app = express()
dbconnect();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json({ extended: true }))
app.use(cookieParser())
app.use("/api/auth",Authrouter)
app.use("/pro",Userouter)



app.get("/",(req, res)=>{
    res.json({mess:"hi tehre"});
});




export default app