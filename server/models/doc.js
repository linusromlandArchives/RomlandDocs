const mongoose = require("mongoose");

//Creates the DocumentSchema and exports it
const DocumentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  doc: {
    type: String,
    required: true,
  },
});

const Doc = mongoose.model("Document", DocumentSchema);

module.exports = Doc;