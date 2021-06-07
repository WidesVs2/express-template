const mongoose = require("mongoose")

const EventSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = Event = mongoose.model("events", EventSchema)
