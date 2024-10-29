import app from './app.js';
import { dbconnection } from './db/connection.js';


const PORT = process.env.PORT || 5000;

dbconnection().then(() => {
    console.log("connected to db");
    app.listen(PORT, () => {
        console.log(`server is up and runnin on http://localhost:${process.env.PORT}`)
    })
}).catch((err) => {
    console.error(err);
});
