const express = require("express")
const router = express.Router()

const Func = require("./routeFunctions")
const Note = require("../models/Note")

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find()
    !notes
      ? res.status(404).json({ message: "Notes Not Found!" })
      : res.status(200).json(notes)
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const note = await Note.find({ _id: req.params.id })
    !note
      ? res.status(404).json({ message: "Note Not Found!" })
      : res.status(200).json(note)
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.post("/", async (req, res) => {
  const { msg } = req.body
  if (!msg) res.status(400).json({ msg, message: "Empty Fields!" })
  let newNote = { msg }
  try {
    await Note.create(newNote, (err, result) => {
      !err
        ? res.status(203).json({ result, message: "Note Created!" })
        : Func.serveErr(err, res)
    })
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.put("/:id", async (req, res) => {
  const { msg } = req.body
  if (!msg) res.status(400).json({ msg, message: "Empty Fields!" })
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { msg },
      (err, result) => {
        !err
          ? res.status(203).json({ result, message: "Note Updated!" })
          : Func.serveErr(err, res)
      }
    )
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.put("/isRead/:id", async (req, res) => {
  const { is_read } = req.body
  if (is_read === undefined)
    res.status(400).json({ is_read, message: "Empty Fields!" })
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { is_read },
      (err, result) => {
        !err
          ? res.status(203).json({ result, message: "Note Updated!" })
          : Func.serveErr(err, res)
      }
    )
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id }, (err, result) => {
      !err
        ? res.status(203).json({ result, message: "Note Deleted!" })
        : Func.serveErr(err, res)
    })
  } catch (err) {
    Func.serveErr(err, res)
  }
})

module.exports = router
