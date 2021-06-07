const mongoose = require("mongoose")

const NoteSchema = mongoose.Schema({
  msg: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  is_read: {
    type: Boolean,
    default: false,
  },
})

module.exports = Note = mongoose.model("notes", NoteSchema)
