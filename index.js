import express from "express"
import cors from "cors"
import { connection } from "./db.js"
import userRouter from "./routes/user.route.js"
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 3000
connection()



app.use(express.json())
app.use(cors())

app.use("/api/v1/user", userRouter)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).send({
        status: err?.statusCode,
        message: err?.message || "internal server error",
        errors: err?.errors || []
    })

})

app.listen(port, () => console.log(`app is listening on port ${port}`))