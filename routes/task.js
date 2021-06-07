// initialize express router
const express = require("express")
const router = express.Router()

// Bring in dependecies
const Func = require("./routeFunctions")
const Task = require("../models/Task")

// @desc Get all tasks
// @route GET /api/v1/tasks
// @access Public -> no login system in this tempalte so all routes are public
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

// @desc Get a task
// @route GET /api/v1/tasks/:id
// @access Public -> no login system in this tempalte so all routes are public
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

// @desc Create a task
// @route POST /api/v1/tasks
// @access Public -> no login system in this tempalte so all routes are public
router.post("/", async (req, res) => {
  const { name } = req.body
  if (!name) res.status(400).json({ name, message: "Empty Fields!" })
  const newTask = { name }
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

// @desc Update a task, name only
// @route PUT /api/v1/tasks/:id
// @access Public -> no login system in this tempalte so all routes are public
router.put("/:id", async (req, res) => {
  const { name } = req.body
  if (!name) res.status(400).json({ name, message: "Empty Fields!" })
  try {
    await Task.findOneAndUpdate(
      { _id: req.params.id },
      { name },
      (err, result) => {
        !err
          ? res.status(203).json({ result, message: "Task Updated!" })
          : Func.serveErr(err, res)
      }
    )
  } catch (err) {
    Func.serveErr(err, res)
  }
})

// @desc Update a task, mark complete or incomplete
// @route PUT /api/v1/tasks/bool/:id
// @access Public -> no login system in this tempalte so all routes are public
router.put("/bool/:id", async (req, res) => {
  const { is_completed } = req.body
  if (is_completed === undefined)
    res.status(400).json({ is_completed, message: "Empty Fields!" })
  try {
    await Task.findOneAndUpdate(
      { _id: req.params.id },
      { is_completed },
      (err, result) => {
        !err
          ? res.status(203).json({ result, message: "Task Updated!" })
          : Func.serveErr(err, res)
      }
    )
  } catch (err) {
    Func.serveErr(err, res)
  }
})

// @desc Delete a task
// @route DELETE /api/v1/tasks/:id
// @access Public -> no login system in this tempalte so all routes are public
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

// export router
module.exports = router
