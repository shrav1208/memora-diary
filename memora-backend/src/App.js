import express from 'express';
import cors from 'cors';

import loginRoutes from './Routes/Login.routes.js';
import signupRoutes from './Routes/Signup.routes.js';
import logoutRoutes from './Routes/Logout.routes.js';
import authRoutes from './Routes/Auth.routes.js';
import dashboardRoutes from './Routes/Dashboard.routes.js';

import sessionConfig from './Config/Session.js';

import requireAuth from './Middleware/Auth.js';

const app = express();

//Middleware

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

app.use(sessionConfig);


//Authentication

app.use('/api/login', loginRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/logout', requireAuth, logoutRoutes);
app.use('/api/auth', authRoutes);

//CRUD

app.use('/api/dashboard', requireAuth, dashboardRoutes);

//Test

app.get('/api/test', (req, res)=>{
    res.send('success');
});

export default app;