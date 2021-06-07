// Bring in mongoose Dependecy
const mongoose = require("mongoose")

// Create Schema for DB entries
const TaskSchema = mongoose.Schema({
  name: {
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

// export mongoose model as Task
module.exports = Task = mongoose.model("tasks", TaskSchema)
