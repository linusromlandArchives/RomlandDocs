const express = require("express");
const app = express();
const fs = require("fs");
const Doc = require("./models/doc.js");
const dBModule = require("./dbModule.js");
const port = 4654;
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const clientDir = __dirname + "/client";

//Connect to MongoDB
connectToMongo("RomlandDocs");

app.use(express.static(clientDir));

io.on("connection", async (socket) => {
  socket.on("msg", async function (msg) {
    if (await dBModule.getDoc(Doc, msg.doc)) {
      await dBModule.setDoc(Doc, msg.doc, msg.text);
      io.sockets.emit("msg", await dBModule.getDoc(Doc, msg.doc));
    } else {
      createDoc(msg.doc, msg.text);
    }
  });

  socket.on("getDoc", async function (msg) {
    io.sockets.emit("getDoc", await dBModule.getDoc(Doc, msg.doc));
  });
});

server.listen(port, () => console.log(`Server listening on port ${port}!`));

function connectToMongo(dbName) {
  if (fs.existsSync("mongoauth.json")) {
    dBModule.cnctDBAuth(dbName);
  } else {
    dBModule.cnctDB(dbName);
  }
}

function createDoc(doc, text) {
  dBModule.saveToDB(
    new Doc({
      text: text,
      doc: doc,
    })
  );
}
