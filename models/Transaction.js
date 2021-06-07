const mongoose = require("mongoose")

const TransSchema = mongoose.Schema({
  desc: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
    default: 0,
  },
  operand: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = Trans = mongoose.model("transactions", TransSchema)
