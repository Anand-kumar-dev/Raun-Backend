import client from "../config/redis.config.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.utils.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) return res.json({ mes: "email or password is not there" });

    try {
        const user = await User.findOne({ email }).select("+password")
        console.log(user);
        if (!user) return res.status(400).json({ mes: "User not found" })
            
        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) return res.status(400).json({ mes: "password is incorect" });

        const accessToken = generateToken(user.id);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });
        req.user = user;
        res.status(200).json({
            mes: user,
            accesstoken: accessToken
        });

    } catch (error) {
        console.log(error)
        res.json({ mes: `error in loging in ${error}` })
    }

};



export const signup = async (req, res) => {
    try {
        const { username, zerodhausername, email, password } = req.body

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ mes: "User already exists please log in " });

        const newUser = User.create({
            username,
            zerodhausername,
            email,
            password
        });


        return res.json({ mes: "User create successfully please log in" });
    } catch (error) {
        console.log(`erorr while signing up ${error}`);
        res.status(500).json({ mes: "Inernal server error" })
    }


}


export const logout = async (req, res) => {

    try {
        const accessToken = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!accessToken) return res.status(200).json({ mes: "you are not authorize to see this webpage" })

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ mes: "Unauthorize" })
        await client.set(decoded.id, accessToken, { EX: 60 * 60 * 24 });

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({ mes: "logged out successfully" })
    } catch (error) {
        console.log("error while logging out" + error)
        res.status(500).json({ mes: "error while logging out" + error })
    }
}