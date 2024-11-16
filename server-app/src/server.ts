import express from "express"; //--
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig";
import exp from "constants";
import endpoints from "./routes/shortUrl";

dotenv.config();
connectDb();

const port = process.env.PORT || 5002 //--

const app = express(); //create server //--

//Middleware
app.use(express.json()); //can have json responses
app.use(express.urlencoded({extended: true}));
app.use(cors({ 
    //cors- cross origin resource sharing: can send and receive req from anywhere regardless of versions and networks ex: chrome version
    origin: "http://localhost:3000",//Front end app is on 3000
    credentials: true,
})
);

app.use("/api/", endpoints);//endpoints = routes obj in ./routes/shortUrl


// app.get("/", (req, res) => { //--
//     res.send("Hello World");
// });

app.listen(port, () => {
    console.log(`Server started successfully on port (Server.ts): ${port}`); //--
});
