import express from 'express'
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import messageRoutes from './routes/message.route.js'


dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const port = process.env.PORT || 5000

app.use("/api/auth", authRoutes)

app.use("/api/message",  messageRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDB()
})  ;