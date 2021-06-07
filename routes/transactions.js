const express = require("express")
const router = express.Router()

const Func = require("./routeFunctions")
const Trans = require("../models/Transaction")

router.get("/", async (req, res) => {
  try {
    const transactions = await Trans.find()
    !transactions
      ? res.status(404).json({ message: "Transactions Not Found!" })
      : res.status(200).json(transactions)
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const transaction = await Trans.find({ _id: req.params.id })
    !transaction
      ? res.status(404).json({ message: "Transaction not Found!" })
      : res.status(200).json(transaction)
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.post("/", async (req, res) => {
  const { desc, amount, operand } = req.body
  if (!desc || !amount) {
    res.status(400).json({ desc, amount, operand, message: "Empty Fields!" })
  }
  const newTrans = { desc, amount, operand }
  try {
    await Trans.create(newTrans, (err, result) => {
      !err
        ? res.status(203).json({ result, message: "Transaction Created!" })
        : Func.serveErr(err, res)
    })
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.put("/:id", async (req, res) => {
  const { desc, amount, operand } = req.body
  if (!desc || !amount || !operand) {
    res.status(400).json({ desc, amount, operand, message: "Empty Fields!" })
  }
  try {
    await Trans.findOneAndUpdate(
      { _id: req.params.id },
      { desc, amount, operand },
      (err, result) => {
        !err
          ? res.status(203).json({ result, message: "Transaction Updated!" })
          : Func.serveErr(err, res)
      }
    )
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await Trans.findOneAndDelete({ _id: req.params.id }, (err, res) => {
      !err
        ? res.status(203).json({ result, message: "Transaction Deleted!" })
        : Func.serveErr(err, res)
    })
  } catch (err) {
    Func.serveErr(err, res)
  }
})

module.exports = router
