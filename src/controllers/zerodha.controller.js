import { KiteConnect } from "kiteconnect";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import kite from "../services/kite.service.js";

dotenv.config();



export const kitelogin = async (req, res) => {

    const stateToken = jwt.sign({ Id: req.user }, process.env.JWT_SECRET, {
        expiresIn: "5m"
    });

    const api_key = process.env.ZERODHA_API_KEY;
    const redirectParams = encodeURIComponent(`state=${stateToken}`);
    res
        .status(200)
        .json({ url: `https://kite.zerodha.com/connect/login?v=3&api_key=${api_key}&redirect_params=${redirectParams}` });

}



export const kiteCallback = async (req, res) => {
    try {

         const request_token = req.query.request_token;
        const stateToken = req.query.state; 


        if (!request_token) throw new ApiError("Request token is required in kiteconnect", 400);
        if (!stateToken) throw new ApiError("Missing state token in kiteconnect", 400);


        const decoded = jwt.verify(stateToken, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ message: "Invalid or expired state token" });

        const response = await kite.generateSession(request_token, process.env.ZERODHA_API_SECRET);
        const Kiteaccess_token = response.access_token;
        kite.setAccessToken(Kiteaccess_token);
        console.log("Kite Access Token:", Kiteaccess_token);
         res.status(200).json({ mes: "Kite accessed succesfully" });
        
    } catch (error) {
        res.status(400).json({ 
            mes: "Error in kite callback",
             error: error.message });
    }

};





export async function getProfile(req, res) {
  try {
    const profile = await kite.getProfile();
    console.log(`someone accessed profile: ${profile}`);  
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ mes: err.message } );
  }
}



export async function getHoldings(req, res) {
  try {
    const holdings = await kite.getHoldings();
     res.status(200).json(holdings);
  } catch (err) {
    res.status(400).json({ mes: err.message } );
  }
}


export async function getPositions(req, res) {
  try {
    const postion = await kite.getPositions();
     res.status(200).json(postion);
  } catch (err) {
    res.status(400).json({ mes: err.message } );
  }
}


export async function getfunds(req, res) {
  try {
    const equity = await kite.getMargins("equity");
     res.status(200).json(equity);
  } catch (err) {
    res.status(400).json({ mes: err.message } );
  }
}


export async function zerout(req, res) {

  try {
    const response = await kite.invalidateAccessToken(access_tokenopt);
    res.json(response);

  } catch (err) {
    res.send(err);
  }
}
