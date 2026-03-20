import app from './App.js';
import dbConnection from './Config/DB.js';
import mongoose from 'mongoose';

const port = process.env.PORT || 3000;

(async()=>{

    await dbConnection();

   const server = app.listen(port, () => {
        console.log("listening on port " + port);
    });

    // graceful shutdown
    const shutdown = () => {
        console.log("Shutting down...");
        server.close(() => {
            mongoose.connection.close(false, () => {
                console.log("MongoDB connection closed");
                process.exit(0);
            });
        });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

    process.on('unhandledRejection', (reason) => {
        console.error('Unhandled Rejection:', reason);
    });

    process.on('uncaughtException', (err) => {
        console.error('Uncaught Exception:', err);
        process.exit(1);
    });


})();