import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cookieParser from "cookie-parser"
import dbconnect from "./src/config/db.config"
import Authrouter from "./src/routes/auth.route"
import Userouter from "./src/routes/user.route"


const  app = express()
dbconnect();

app.use(express.json({ extended: true }))
app.use(cookieParser())
app.use("/api/auth",Authrouter)
app.use("/pro",Userouter)

app.get("/",(req, res)=>{
    res.json({mess:"hi tehre"});
});




export default app