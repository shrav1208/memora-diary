import session from 'express-session';
import MongoStore from 'connect-mongo';

export default session({
    name: "memora-session-id", //cookie name

    secret: "VA8u84c9DFrumqSSBD8urB8FuuGm8rM84FyqFMBtc9mMBx4A", //signing key

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
        maxAge: null // default = session cookie (closes on browser close)
    }
    

})