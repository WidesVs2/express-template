const express = require("express")
const router = express.Router()

const Func = require("./routeFunctions")
const Shortcut = require("../models/Shortcut")

router.get("/", async (req, res) => {
  try {
    const shortcuts = await Shortcut.find()
    !shortcuts
      ? res.status(404).json({ message: "Shortcuts Not Found!" })
      : res.status(200).json(shortcuts)
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const shortcut = await Shortcut.find({ _id: req.params.id })
    !shortcut
      ? res.status(404).json({ message: "Shortcut Not Found!" })
      : res.status(200).json(shortcut)
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.post("/", async (req, res) => {
  const { name, link, icon } = req.body
  if (!name || !link || !icon)
    res.status(400).json({ name, link, icon, message: "Empty Fields!" })
  let newShortcut = { name, link, icon }
  try {
    await Shortcut.create(newShortcut, (err, result) => {
      !err
        ? res.status(203).json({ result, message: "Shortcut Created!" })
        : Func.serveErr(err, res)
    })
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.put("/:id", async (req, res) => {
  const { name, link, icon } = req.body
  if (!name || !link || !icon)
    res.status(400).json({ name, link, icon, message: "Empty Fields!" })
  try {
    await Shortcut.findOneAndUpdate(
      { _id: req.params.id },
      { name, link, icon },
      (err, result) => {
        !err
          ? res.status(203).json({ result, message: "Shortcut Updated!" })
          : Func.serveErr(err, res)
      }
    )
  } catch (err) {
    Func.serveErr(err, res)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await Shortcut.findOneAndDelete({ _id: req.params.id }, (err, result) => {
      !err
        ? res.status(203).json({ result, message: "Shortcut Deleted!" })
        : Func.serveErr(err, res)
    })
  } catch (err) {
    Func.serveErr(err, res)
  }
})

module.exports = router
