import express from "express";
import cookieParser from "cookie-parser";
import userrouter from "./routes/user.js";
import cors from "cors"


import { config } from "dotenv";
import taskrouter from "./routes/task.js";
import { erorrmiddleware, notMatch } from "./middlewares/error.js";
config({
     path: "./data/config.env"
})
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/user', userrouter)
app.use('/api/v1/task', taskrouter)
app.use(cors({
     origin: [process.env.FRONTENDA_URI],
     methods: ["GET", "PUT", "POST", "DELETE"],
     credentials: true
}))


app.use(erorrmiddleware)


export default app
