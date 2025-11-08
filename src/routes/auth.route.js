import { Router } from "express";
import { login, signup , logout} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";


const router  = Router();

router.post("/login",login)

router.post("/signup",signup)

router.get("/logout",verifyToken ,logout)

export default router;