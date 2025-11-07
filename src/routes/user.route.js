import Router from "express"
import { verifyToken } from "../middleware/auth.middleware.js"
import { kitelogin } from "../controllers/zerodha.controller.js"


const router = Router()

router.get("/kitelogin" , verifyToken ,kitelogin);



export default router