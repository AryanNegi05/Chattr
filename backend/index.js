import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/database.js'
import authRouter from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import { app, server } from './socket/socket.js'
dotenv.config()

const port=process.env.PORT || 5000


app.use(cors({
  origin: "https://chattr-six.vercel.app",
  credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/message",messageRouter)

server.listen(port,()=>{
    connectDb()
    console.log(`Server Started at ${port}`)
})
