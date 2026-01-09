import express from 'express';
import cors from 'cors';

import loginRoutes from './Routes/Login.routes.js';
import signupRoutes from './Routes/Signup.routes.js';
import logoutRoutes from './Routes/Logout.routes.js';
import authRoutes from './Routes/Auth.routes.js';
import createRoutes from './Routes/Create.routes.js';
import readUserRoutes from './Routes/ReadUser.routes.js';
import readPostRoutes from './Routes/ReadPosts.routes.js';
import updatePostRoutes from './Routes/UpdatePost.routes.js';
import deletePostRoutes from './Routes/DeletePost.routes.js';
import getPostRoutes from './Routes/GetPost.routes.js';
import searchPosts from './Routes/SearchPosts.routes.js';
import getYearsRoutes from './Routes/GetYears.routes.js';

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

//Display

app.use('/api/get/years', requireAuth, getYearsRoutes);

//CRUD

app.use('/api/create', requireAuth, createRoutes);
app.use('/api/read/user', requireAuth, readUserRoutes);
app.use('/api/read/post', requireAuth, readPostRoutes);
app.use('/api/update/post', requireAuth, updatePostRoutes);
app.use('/api/delete/post', requireAuth, deletePostRoutes);
app.use('/api/get/post', requireAuth, getPostRoutes);

//Search
app.use('/api/search', requireAuth, searchPosts);

//Test

app.get('/api/test', (req, res)=>{
    res.send('success');
});

export default app;