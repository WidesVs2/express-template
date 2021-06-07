const express = require("express")
const router = express.Router()

const Func = require("./routeFunctions")
const Event = require("../models/Event")

router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
    !events
      ? res.status(404).json({ message: "Events Not Found!" })
      : res.status(200).json(events)
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.find({ _id: req.params.id })
    !event
      ? res.status(404).json({ message: "Event Not Found!" })
      : res.status(200).json(event)
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.post("/", async (req, res) => {
  const { name, desc, date } = req.body
  if (!name || !desc || !date) {
    res.status(400).json({ name, desc, date, message: "Empty Fields!" })
  }
  let newEvent = { name, desc, date }
  try {
    await Event.create(newEvent, (err, result) => {
      !err
        ? res.status(203).json({ result, message: "Event Created!" })
        : Func.serveErr(err, res)
    })
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.put("/:id", async (req, res) => {
  const { name, desc, date } = req.body
  if (!name || !desc || !date) {
    res.status(400).json({ name, desc, date, message: "Empty Fields!" })
  }
  try {
    await Event.findOneAndUpdate(
      { _id: req.params.id },
      { name, desc, date },
      (err, result) => {
        !err
          ? res.status(203).json({ result, message: "Event Updated!" })
          : Func.serveErr(err, res)
      }
    )
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await Event.findOneAndDelete({ _id: req.params.id }, (err, result) => {
      !err
        ? res.status(203).json({ result, message: "Event Deleted!" })
        : Func.serveErr(err, res)
    })
  } catch (err) {
    Func.serveErr(err, res)
  }
})

module.exports = router
