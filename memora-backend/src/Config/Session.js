import session from 'express-session';
import MongoStore from 'connect-mongo';

export default session({
    name: "memora-session-id", //cookie name

    secret: process.env.SESSION_SECRET, //signing key 

    resave: false, //re save session on every request (false)
    saveUninitialized: false, //create sessions for anonymous users who are not logged in (false)

    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions",
        ttl: 60 * 60 * 24, //seconds (1 day expiry)
    }),

    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // false locally, true in production
        sameSite: "strict", // CSRF protection — never send cookie on cross-site requests
        maxAge: null // default = session cookie (closes on browser close)
    }


})