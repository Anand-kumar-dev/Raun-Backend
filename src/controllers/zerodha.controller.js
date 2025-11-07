import { KiteConnect } from "kiteconnect";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



export const kitelogin = async (req, res) => {

    const stateToken = jwt.sign({ Id: req.user}, process.env.JWT_SECRET, {
        expiresIn: "5m"
    });

    const api_key = process.env.ZERODHA_API_KEY;
    const redirectParams = encodeURIComponent(`state=${stateToken}`);
    res.redirect(`https://kite.zerodha.com/connect/login?v=3&api_key=${api_key}&redirect_params=${redirectParams}`);

}
