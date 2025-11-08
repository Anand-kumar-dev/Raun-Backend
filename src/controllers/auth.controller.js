import { User } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.utils.js";


export const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) return res.json({ mes: "email or password is not there" });

    try {
        const user = await User.findOne({ email }).select("+password")
        if (!user) return res.json({ mes: "User not found" })

        const isPasswordCorrect = user.comparePassword(password)
        if (!isPasswordCorrect) res.json({ mes: "password is incorect" });

        const accessToken = generateToken(user.id);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });
        req.user = user;
        res.status(200).json({ mes: user ,
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

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.status(200).json({mes:"logged out successfully"})
}