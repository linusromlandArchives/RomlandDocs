const express = require("express");
const app = express();
const port = 4654;
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const clientDir = __dirname + "/client";

let textDoc = "";

console.log(clientDir);

app.use(express.static(clientDir));

io.on("connection", async (socket) => {
  socket.emit("msg", textDoc);
  socket.on("msg", function (msg) {
    textDoc = msg;
    io.sockets.emit("msg", textDoc);
  });
});

server.listen(port, () => console.log(`Server listening on port ${port}!`));
