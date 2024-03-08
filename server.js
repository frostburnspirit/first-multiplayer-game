const express = require("express");
const app = express();
const glb = require("./modules/global");

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/for client/test.html");
});

io.on("connection", (socket) => {
  console.log(glb.blue, "new connection!");
  socket.on("test", (stri) => {
    console.log(stri);
  });
});

server.listen(port, () => {
  console.log(glb.green, `\nListening on port ${port}`);
});
