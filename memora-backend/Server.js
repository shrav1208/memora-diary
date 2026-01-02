import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import loginRoutes from './Routes/Login.routes.js';

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())

const mongoURL = "mongodb://127.0.0.1:27017/test"

mongoose.connect(mongoURL)
.then(()=>console.log("MongoDB connected succeessfully"))
.catch((err=>console.log("MongoDB connection error ", err)))

app.use('/api/login', loginRoutes)

app.get('/api/test', (req, res)=>{
    res.send('success')
})

app.listen(port, ()=>{
    console.log("listening on port " + port)
})