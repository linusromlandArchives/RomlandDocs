const textArea = document.getElementsByTagName("textarea")[0];

const socket = io();

let search_params = new URL(window.location.href).searchParams;

if (!search_params.get("doc")) {
  window.history.replaceState(
    "object or string",
    "doc",
    "/?doc=" + Math.floor(Math.random() * 100000)
  );
  search_params = new URL(window.location.href).searchParams;
}

socket.on("connect", () => {
  let jsonSend = {
    doc: search_params.get("doc"),
  };
  socket.emit("getDoc", jsonSend);
  socket.on("getDoc", function (msg) {
    textArea.value = msg.text
  });

  socket.on("msg", function (msg) {
    if (msg.doc == search_params.get("doc")){
      textArea.value = msg.text;
    } 
  });
  textArea.oninput = () => {
    jsonSend = {
      text: textArea.value,
      doc: search_params.get("doc"),
    };
    socket.emit("msg", jsonSend);
  };
});
