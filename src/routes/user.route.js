import Router from "express"
import { verifyToken } from "../middleware/auth.middleware.js"
import { getfunds, getHoldings, getPositions, getProfile, kiteCallback, kitelogin, zerout } from "../controllers/zerodha.controller.js"


const router = Router()

router.get("/kitelogin"  ,kitelogin);

router.get("/callback",kiteCallback)

router.use(verifyToken);


router.get("/profile" ,getProfile);

router.get("/holdings"  ,getHoldings);

router.get("/positions" ,getPositions);

router.get("/funds" ,getfunds);

router.get("/zerout" ,zerout);


export default router