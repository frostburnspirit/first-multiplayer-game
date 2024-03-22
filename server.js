// express js
import express from "express";
const app = express();
// socket.io
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
// modules
import * as glb from "./modules/global.js";
// path
import path from "path";
import { fileURLToPath } from "url";
const dirname = path.dirname(fileURLToPath(import.meta.url));

// Settings
const port = 3000;
app.use(express.static("public"));
app.use("/shared", express.static("shared"));

// Socket.io

io.on("connection", (socket) => {
  console.log(glb.blue, "new connection!");

  socket.on("test", (str) => {
    console.log(str);
  });
});

// Listen for connections
app.get("/", (req, res) => {
  // "/" more common than "/main", "/home", "/index" or similar
  res.sendFile(path.join(dirname, "/public/html/index.html"));
});
app.get("/profile", (req, res) => {
  // should only be accessible when logged in
  res.sendFile(path.join(dirname, "/public/html/personal-profile.html"));
});
app.get("/users/:username", (req, res) => {
  res.sendFile(path.join(dirname, "/public/html/user-profile.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(dirname, "/public/html/about.html"));
});
app.get("/legal", (req, res) => {
  res.sendFile(path.join(dirname, "/public/html/legal.html"));
});

// For all other paths
app.use((req, res) => {
  res.status(404);
  res.sendFile(path.join(dirname, "/public/html/404.html"));
});

server.listen(port, () => {
  console.log(glb.green, `\nListening on port ${port}`);
});
