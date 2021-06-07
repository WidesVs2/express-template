const mongoose = require("mongoose")

const ShortcutSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
})

module.exports = Shortcut = mongoose.model("shortcuts", ShortcutSchema)
