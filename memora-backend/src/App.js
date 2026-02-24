import express from 'express';
import cors from 'cors';

import loginRoutes from './Routes/Login.routes.js';
import signupRoutes from './Routes/Signup.routes.js';
import logoutRoutes from './Routes/Logout.routes.js';
import authRoutes from './Routes/Auth.routes.js';
import createPostRoutes from './Routes/CreatePost.routes.js';
import readUserRoutes from './Routes/ReadUser.routes.js';
import readPostsRoutes from './Routes/ReadPosts.routes.js';
import updatePostRoutes from './Routes/UpdatePost.routes.js';
import deletePostRoutes from './Routes/DeletePost.routes.js';
import getPostRoutes from './Routes/GetPost.routes.js';
import searchPosts from './Routes/SearchPosts.routes.js';
import getYearsRoutes from './Routes/GetYears.routes.js';
import getMonthsRoutes from './Routes/GetMonths.routes.js';
import getDaysRoutes from './Routes/GetDays.routes.js';
import sessionTimezone from './Routes/SessionTimezone.routes.js';
import getMoods from './Routes/GetMoods.routes.js';
import getDailyMood from './Routes/GetDailyMood.routes.js';
import setMood from './Routes/SetMood.routes.js';
import getTodayReflection from './Routes/GetTodayReflection.routes.js';

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
app.use('/api/get/months', requireAuth, getMonthsRoutes);
app.use('/api/get/days', requireAuth, getDaysRoutes);

//CRUD

app.use('/api/create/post', requireAuth, createPostRoutes);
app.use('/api/read/user', requireAuth, readUserRoutes);
app.use('/api/read/posts', requireAuth, readPostsRoutes);
app.use('/api/update/post', requireAuth, updatePostRoutes);
app.use('/api/delete/post', requireAuth, deletePostRoutes);
app.use('/api/get/post', requireAuth, getPostRoutes);

//Search

app.use('/api/search', requireAuth, searchPosts);

//Timezone

app.use('/api/session/timezone', requireAuth, sessionTimezone);

//Mood

app.use('/api/get/moods', requireAuth, getMoods);
app.use('/api/get/daily-mood', requireAuth, getDailyMood);
app.use('/api/set/mood', requireAuth, setMood);

// Reflection
app.use('/api/get/today-reflection', requireAuth, getTodayReflection);

//Test

app.get('/api/test', (req, res)=>{
    res.send('success');
});

export default app;