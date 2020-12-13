const textArea = document.getElementsByTagName("textarea")[0];

const socket = io();

socket.on("connect", () => {
  socket.on("msg", function (msg) {
    textArea.innerText = msg;
  });
  textArea.oninput = () => {
    socket.emit("msg", textArea.value);
  };
});
