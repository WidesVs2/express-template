const express = require("express")
const router = express.Router()

const Func = require("./routeFunctions")

router.post("/", async (req, res) => {
  try {
    if (!req.files) {
      res.status(400).json({ message: "No File Uploaded!" })
    } else {
      let icon = req.files.icon
      icon.mv("./public/icons/" + icon.name)

      res.status(203).json({
        message: "File Uploaded!",
        data: {
          name: icon.name,
          mimetype: icon.mimetype,
          size: icon.size,
        },
      })
    }
  } catch (err) {
    Func.serveErr(err, res)
  }
})

module.exports = router
