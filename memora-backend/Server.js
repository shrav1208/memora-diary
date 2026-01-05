import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.PORT, process.env.SESSION_SECRET, process.env.MONGO_URL);

import loginRoutes from './Routes/Login.routes.js';
import signupRoutes from './Routes/Signup.routes.js';
import dashboardRoutes from './Routes/Dashboard.routes.js';
import logoutRoutes from './Routes/Logout.routes.js';
import authRoutes from './Routes/Auth.routes.js';
import sessionConfig from './Config/Session.js';
import requireAuth from './Middleware/Auth.js';
import session from 'express-session';

const app = express();
const port = 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

app.use(sessionConfig);

app.use('/api/login', loginRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/dashboard', requireAuth, dashboardRoutes);
app.use('/api/logout', requireAuth, logoutRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/test")
.then(()=>console.log("MongoDB connected succeessfully"))
.catch((err=>console.log("MongoDB connection error ", err)));

app.get('/api/test', (req, res)=>{
    res.send('success');
});

app.listen(port, ()=>{
    console.log("listening on port " + port);
});