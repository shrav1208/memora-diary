import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.PORT, process.env.SESSION_SECRET, process.env.MONGO_URL);

import loginRoutes from './Routes/Login.routes.js';
import signupRoutes from './Routes/Signup.routes.js';
import sessionConfig from './Config/Session.js';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(sessionConfig);

app.use('/api/login', loginRoutes);
app.use('/api/signup', signupRoutes);

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL)
.then(()=>console.log("MongoDB connected succeessfully"))
.catch((err=>console.log("MongoDB connection error ", err)));

app.get('/api/test', (req, res)=>{
    res.send('success');
});

app.listen(port, ()=>{
    console.log("listening on port " + port);
});