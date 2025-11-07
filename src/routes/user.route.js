import Router from "express"
import { verifyToken } from "../middleware/auth.middleware"


const router = Router()

router.get("/dashboard" , verifyToken ,(req,res)=>{
    res.json({mes:"hi this is my portfolio"})
})
export default router