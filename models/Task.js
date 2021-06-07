const mongoose = require("mongoose")

const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
  is_completed: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = Task = mongoose.model("tasks", TaskSchema)
