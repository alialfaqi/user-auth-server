import { userModel } from "../model/user.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import AppError from "../utils/AppError.js";

const getAll = async (req, res) => {
    const users = await userModel.find();
    res.send({ message: "Done", users })
}

const signUp = async (req, res, next) => {
    const { email, password } = req.body;
    const foundedUser = await userModel.findOne({ email })
    if (foundedUser) return next(new AppError("Duplicated User", 409))
    const hashedPassword = await bcrypt.hash(password, 10)
    req.body.password = hashedPassword
    const addedUser = new userModel(req.body)
    await addedUser.save()
    res.send({
        message: "user added", addedUser
    })
}



const signIn = async (req, res, next) => {
    const { email, password } = req.body
    const foundedUser = await userModel.findOne({ email })
    if (!foundedUser) return next(new AppError("user not found", 500))
    const matched = bcrypt.compareSync(password, foundedUser.password)
    if (!matched) return next(new AppError("wrong password", 401))
    const token = jwt.sign({ id: foundedUser._id, first_name: foundedUser.first_name, last_name: foundedUser.last_name }, "tokenSignature")
    res.send({ message: "success", token })
}


export {
    signIn,
    signUp,
    getAll
}