import { KiteConnect } from "kiteconnect";
import dotenv from "dotenv";

dotenv.config();

const kite = new KiteConnect({ api_key: process.env.ZERODHA_API_KEY });

export default kite;
