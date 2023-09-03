import express from 'express'
import { getAll, signIn, signUp } from '../controller/user.controller.js'

const router = express.Router()

router.get("/", getAll)
router.post("/signin", signIn)
router.post("/signup", signUp)


export default router