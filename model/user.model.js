import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
}, {
    timestamps: true
})

export const userModel = mongoose.model("User", userSchema)