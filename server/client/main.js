const textArea = document.getElementsByTagName("textarea")[0]

textArea.oninput = () => {
    console.log(textArea.value)
}

const socket = io();

socket.on("connect", () => {
  socket.on("id", function (msg) {
    console.log("Msg " + msg);
    id = msg;
  });
  socket.on("msg", function (msg) {
    if (JSON.parse(msg).recv == id) {
      document.getElementById("mainP").innerText = msg;
    }
  });
});
