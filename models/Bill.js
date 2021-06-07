const mongoose = require("mongoose")

const BillSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
    default: 0,
  },
  due_date: {
    type: Date,
    default: Date.now(),
  },
  is_paid: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = Bill = mongoose.model("bills", BillSchema)
