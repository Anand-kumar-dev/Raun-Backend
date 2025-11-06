import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        zerodhausername: {
            type: String,
            required: true,
        },
        email: {
            type: email,
            required: true,
        },
        password: {
            type: password,
            required: true,
            select: false
        }

    }, { timestamp: true });



   export const User = mongoose.model( users , userSchema);


   User.pre