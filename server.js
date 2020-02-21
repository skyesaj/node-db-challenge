const express = require("express");

// create server
const server = express();
// read
server.use(express.json());

const projectRouter = require("./project/projectRouter");
server.use("/api/project", projectRouter);

server.get("/", (req, res) => {
  return res.send("Welcome to the API");
});

server.use((error, res, req, next) => {
  console.log(error);
  //   return res.status(500).json({ error: "something is not right" });
});

module.exports = server;
