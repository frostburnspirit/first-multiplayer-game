// const express = require("express");
import express from "express";
const app = express();
import * as glb from "./modules/global.js";

// const http = require("http");
import http from "http";
const server = http.createServer(app);

// const { Server } = require("socket.io");
import { Server } from "socket.io";
const io = new Server(server);

import path from "path";

import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Settings

const port = 3000;

app.use(express.static("public"));

// Socket.io

io.on("connection", (socket) => {
  console.log(glb.blue, "new connection!");

  socket.on("test", (str) => {
    console.log(str);
  });
});

// Listen for connections

app.get("/", (req, res) => {
  res.sendFile(path.join(dirname, "/public/test.html"));
});

server.listen(port, () => {
  console.log(glb.green, `\nListening on port ${port}`);
});
