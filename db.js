import mongoose from "mongoose";

export const connection = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('DB Connected!'))
        .catch(() => console.log('DB Failed!'))
}


// 'mongodb://127.0.0.1:27017/user'