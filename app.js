// Bring in initial dependecies
const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const winston = require("./logger")
const fileUpload = require("express-fileupload")
const _ = require("lodash")
const cors = require("cors")

// Include routes
const BillRoute = require("./routes/bills")
const EventRoute = require("./routes/events")
const NoteRoute = require("./routes/notes")
const TaskRoute = require("./routes/tasks")
const TransRoute = require("./routes/transactions")
const ShortRoute = require("./routes/shortcuts")
const iconFileRoute = require("./routes/iconFiles")

// initialize App
const app = express()

// Connect to Database
// // Retrieve DB URI
const db = require("./config/keys")
const Task = require("./models/Task")

// //Create DB Connection, log errors if present
mongoose.connect(
  db.mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    !err ? console.log("MongoDB Connected...") : console.log(err)
  }
)

// Enable File uploads
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 2 * 1024 * 1024 * 1024, //2MB max file(s) size
    },
  })
)

// Initialize logging system
app.use(logger("combined", { stream: winston.stream }))

// Use required parsers
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// Declare routes
app.use("/api/v1/bills", BillRoute)
app.use("/api/v1/events", EventRoute)
app.use("/api/v1/notes", NoteRoute)
app.use("/api/v1/tasks", TaskRoute)
app.use("/api/v1/transactions", TransRoute)
app.use("/api/v1/shortcuts", ShortRoute)
app.use("api/v1/icons", iconFileRoute)

// Handle Production
if (process.env.NODE_ENV === "production") {
  // handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"))
}

// Export App to /bin
module.exports = app
