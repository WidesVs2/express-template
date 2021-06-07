const express = require("express")
const router = express.Router()

const Func = require("./routeFunctions")
const Bill = require("../models/Bill")

router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find()
    !bills
      ? res.status(404).json({ message: "Bills Not Found!" })
      : res.status(200).json(bills)
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const bill = await Bill.find({ _id: req.params.id })
    !bill
      ? res.status(404).json({ message: "Bill Not Found!" })
      : res.status(200).json(bill)
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.post("/", async (req, res) => {
  const { name, amount, due_date } = req.body
  if (!name || !amount || !due_date) {
    res.status(400).json({ name, amount, due_date, message: "Empty Fields!" })
  }
  const newBill = { name, amount, due_date }
  try {
    await Bill.create(newBill, (err, result) => {
      !err
        ? res.status(203).json({ result, message: "Bill Created!" })
        : Func.serveErr(err, res)
    })
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.put("/:id", async (req, res) => {
  const { name, amount, due_date } = req.body
  if (!name || !amount || !due_date) {
    res.status(400).json({ name, amount, due_date, message: "Empty Fields!" })
  }
  await Bill.findOneAndUpdate(
    { _id: req.params.id },
    { name, desc, due_date },
    (err, result) => {
      !err
        ? res.status(203).json({ result, message: "Bill Updated!" })
        : Func.serveErr(err, res)
    }
  )
})

router.put("/isPaid/:id", async (req, res) => {
  const { is_paid } = req.body
  if (is_paid === undefined)
    res.status(400).json({ is_paid, message: "Empty Fields!" })
  try {
    await Bill.findOneAndUpdate(
      { _id: req.params.id },
      { is_paid },
      (err, result) => {
        !err
          ? res.status(203).json({ result, message: "Bill Updated!" })
          : Func.serveErr(err, res)
      }
    )
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await Bill.findOneAndDelete({ _id: req.params.id }, (err, result) => {
      !err
        ? res.status(203).json({ result, message: "Bill Deleted!" })
        : Func.serveErr(err, res)
    })
  } catch (err) {
    Func.serveErr(err, res)
  }
})

module.exports = router
