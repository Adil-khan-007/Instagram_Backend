const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const connectDatabase = require("./ConnectDatabase/connect");
const AuthRouter = require("./Router/authRouter");
const AppRouter = require("./Router/Approuter");

const server = express();

server.use(express.json());

server.use(cors());

server.use(morgan("tiny"))

server.get("/",(req,res)=>{
    res.send("Server Working")
})

server.use("/users",AuthRouter);

server.use("/posts",AppRouter)

const port = process.argv[2] || process.env.PORT

server.listen(port,async ()=>{
    try{
        await connectDatabase();
        console.log(`Server listening on port ${port}`)
    }
    catch(err){
        console.log(err.message);
    }
})