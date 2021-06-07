class Func {
  constructor(counter) {
    this._counter = counter
  }

  serveErr(err, res) {
    console.log(err)
    res.status(500).json({
      msg: "Server Error",
      err,
    })
  }

  incrementCount() {
    this._counter++
    return this._counter
  }

  decrementCount() {
    this._counter--
    return this._counter
  }
}

module.exports = Func = new Func(Math.floor(Math.random() * 10000))