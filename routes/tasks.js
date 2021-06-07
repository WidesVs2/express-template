const express = require("express")
const router = express.Router()

const Func = require("./routeFunctions")
const Task = require("../models/Task")

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
    !tasks
      ? res.status(404).json({ message: "Tasks Not Found!" })
      : res.status(200).json(tasks)
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.find({ _id: req.params.id })
    !task
      ? res.status(404).json({ message: "Task Not Found!" })
      : res.status(200).json(task)
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.post("/", async (req, res) => {
  const { name, desc } = req.body
  if (!name || !desc)
    res.status(400).json({ name, desc, message: "Empty Fields!" })
  let newTask = { name, desc }
  try {
    await Task.create(newTask, (err, result) => {
      !err
        ? res.status(203).json({ result, message: "Task Created!" })
        : Func.serveErr(err, res)
    })
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.put("/:id", async (req, res) => {
  const { name, desc } = req.body
  if (!name || !desc)
    res.status(400).json({ name, desc, message: "Empty Fields!" })
  await Task.findOneAndUpdate(
    { _id: req.params.id },
    { name, desc },
    (err, result) => {
      !err
        ? res.status(203).json({ result, message: "Task Updated!" })
        : Func.serveErr(err, res)
    }
  )
})

router.put("/isComplete/:id", async (req, res) => {
  const { is_completed } = req.body
  if (is_completed === undefined)
    res.status(400).json({ is_completed, message: "Empty Fields!" })
  try {
    await Task.findOneAndUpdate(
      { _id: req.params.id },
      { is_completed },
      (err, result) => {
        !err
          ? res.status(203).json({ result, message: "Task Marked Complete!" })
          : Func.serveErr(err, res)
      }
    )
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id }, (err, result) => {
      !err
        ? res.status(203).json({ result, message: "Task Deleted!" })
        : Func.serveErr(err, res)
    })
  } catch (err) {
    Func.serveErr(err, res)
  }
})

module.exports = router
