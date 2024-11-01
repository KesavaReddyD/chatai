import app from '../src/app.js';
import { dbconnection } from '../src/db/connection.js';


const PORT = process.env.PORT || 5000;

dbconnection().then(() => {
    console.log("connected to db");
    app.listen(PORT, () => {
        console.log(`server is up and runnin....`)
    })
}).catch((err) => {
    console.error(err);
});
