require("dotenv").config();

const PORT = 3000;
const express = require("express");
const server = express();
const morgan = require("morgan");
const cors = require("cors");

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

const apiRouter = require("./api");
server.use("/api", apiRouter);

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
