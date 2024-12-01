import express from 'express'
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js'

dotenv.config()
const app = express()

app.use(express.json())

const port = process.env.PORT || 5000

app.use("/api/auth", authRoutes)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDB()
})  ;