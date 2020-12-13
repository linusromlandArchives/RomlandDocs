const express = require("express");
const app = express();
const port = 4654;
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const clientDir = __dirname + "/client";

console.log(clientDir);

app.use(express.static(clientDir));

io.on("connection", async (socket) => {
  console.log("Got connect!");

  socket.emit("id", "tjosan folket");

  socket.on("disconnect", function () {
    console.log("Got disconnect!");
  });

  socket.on("msg", function (msg) {
    io.sockets.emit("msg", msg);
  });
});

server.listen(port, () => console.log(`Server listening on port ${port}!`));
