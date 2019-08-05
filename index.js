// implement your API here

const express = require("express");
const server = express();
const port = 8000;
server.use(express.json())
const users = require("./data/db")

server.get("/", (req, res)=>{
    res.send("GET working")
})

server.get("")

server.listen(port, ()=>{console.log("API running")})