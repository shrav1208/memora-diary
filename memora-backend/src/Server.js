import app from './App.js';
import dbConnection from './Config/DB.js';

const port = 3000;

(async()=>{

    await dbConnection();

    app.listen(port, ()=>{
        console.log("listening on port " + port);
    });

})();