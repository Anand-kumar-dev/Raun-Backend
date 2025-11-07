import Router from "express"
import { verifyToken } from "../middleware/auth.middleware.js"
import { kiteCallback, kitelogin } from "../controllers/zerodha.controller.js"


const router = Router()

router.get("/kitelogin" , verifyToken ,kitelogin);

router.get("/callback",kiteCallback)


export default router