import dotenv from "dotenv"
dotenv.config()
import express from "express"
import dbconnect from "./src/config/db.config"
import Authrouter from "./src/routes/auth.route"

const  app = express()
dbconnect();

app.get("/",(req, res)=>{
    res.json({mess:"hi tehre"});
});

app.use("/api/auth",Authrouter)


export default app