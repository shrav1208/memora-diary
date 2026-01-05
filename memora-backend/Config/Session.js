import dotenv from 'dotenv';
dotenv.config();

import session from 'express-session';
import MongoStore from 'connect-mongo';

export default session({
    name: "mem-session-id", //cookie name

    secret: process.env.SESSION_SECRET, //signing key

    resave: false, //re save session on every request (false)
    saveUninitialized: false, //create sessions for anonymous users who are not logged in (false)

    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/test",
        collectionName: "sessions",
        ttl: 60*60*24, //seconds (1 day expiry)
    }),

    cookie: {
        httpOnly: true,
        secure: false, //false for localhost change to true for prod
        sameSite: "lax", // CSRF protection
        maxAge: 1000*60*60*24, // milliseconds (1 day expiry)
    }
    

})