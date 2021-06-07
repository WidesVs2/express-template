const keyStr = /[a-zA-Z_-]{3,20}/g // 3-20 chars, lower || upper || - || _
const appNameStr = /[a-zA-Z_-]{3,60}/g //3-60 chars, lower || upper || - || _
const usernameStr = /^[A-Za-z]\w{7,14}$/ // 7-16 characters, only chars, digits, underscore, ^letter
const pwdStrings = {
  weak: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/, // 7-15 chars, one digit, one special
  moderate: /^[A-Za-z]\w{7,14}$/, // 7-16 characters, only chars, digits, underscore, ^letter
  strong: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/, // 6-20 chars, one upper, one lower, one digit
  great: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/, // 8-15 chars, one digit, one special, one lower, one upper
}
const zipStr = /\b\d{5}\b/g // 5 digits only
const emailStr =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ //matches to valid emails
const states = [
  "alabama",
  "alaska",
  "arizona",
  "arkansas",
  "california",
  "colorado",
  "connecticut",
  "delaware",
  "florida",
  "georgia",
  "hawaii",
  "idaho",
  "illinois",
  "indiana",
  "iowa",
  "kansas",
  "kentucky",
  "louisiana",
  "maine",
  "maryland",
  "massachusetts",
  "michigan",
  "minnesota",
  "mississippi",
  "missouri",
  "montana",
  "nebraska",
  "nevada",
  "new hampshire",
  "new jersey",
  "new mexico",
  "new york",
  "north carolina",
  "north dakota",
  "ohio",
  "oklahoma",
  "oregon",
  "pennsylvania",
  "rhode island",
  "south carolina",
  "south dakota",
  "tennessee",
  "texas",
  "utah",
  "vermont",
  "virginia",
  "washington",
  "west virginia",
  "wisconsin",
  "wyoming",
]

class validator {
  constructor(keyStr, appNameStr, usernameStr, pwdStrings, zipStr, emailStr) {
    this._keyStr = keyStr
    this._appNameStr = appNameStr
    this._usernameStr = usernameStr
    this._pwdStrings = pwdStrings
    this._zipStr = zipStr
    this._emailStr = emailStr
  }

  checkEmpty(val) {
    if (val == "" || val == null || val == undefined || val == false) {
      return false
    } else {
      return true
    }
  }

  checkPwdLevel(str) {
    let msg = 0
    if (this.checkEmpty(str) === false) {
      msg = 1
      return msg
    } else {
      switch (str) {
        case this._pwdStrings.weak.test(str):
          msg = 2
          break
        case this._pwdStrings.moderate.test(str):
          msg = 3
          break
        case this._pwdStrings.strong.test(str):
          msg = 4
          break
        case this._pwdStrings.great.test(str):
          msg = 5
          break
        default:
          msg = 6
          break
      }
    }
    return msg
  }

  checkpwdMatch(str1, str2) {
    str1 === str2 ? true : false
  }

  checkKey(str) {
    let msg = ""
    if (this.checkEmpty(str) === false) {
      msg = "Empty Field"
      return msg
    } else {
      if (this._keyStr.test(str)) {
        msg = "Valid"
      } else {
        msg = "Invalid"
      }
      return msg
    }
  }

  checkUsername(str) {
    let msg = ""
    if (this.checkEmpty(str) === false) {
      msg = "Empty Field"
      return msg
    } else {
      if (this._usernameStr.test(str)) {
        msg = "Valid"
      } else {
        msg = "Invalid"
      }
      return msg
    }
  }

  checkEmail(str) {
    let msg = ""
    if (this.checkEmpty(str) === false) {
      msg = "Empty Field"
      return msg
    } else {
      if (this._emailStr.test(str)) {
        msg = "Valid"
      } else {
        msg = "Invalid"
      }
      return msg
    }
  }

  checkAppName(str) {
    let msg = ""
    if (this.checkEmpty(str) === false) {
      msg = "Empty Field"
      return msg
    } else {
      if (this._appNameStr.test(str)) {
        msg = "Valid"
      } else {
        msg = "Invalid"
      }
    }
    return msg
  }

  checkZip(code) {
    let msg = ""
    if (this.checkEmpty(str) === false) {
      msg = "Empty Field"
      return msg
    } else {
      if (this._zipStr.test(code)) {
        msg = "Valid"
      } else {
        msg = "Invalid"
      }
    }
    return msg
  }

  checkStates(str) {
    states.forEach((state) => {
      !state.match(str) ? false : true
    })
  }

  validate(func) {
    let errors = []
    if (func === "Valid") {
      return true
    } else if (func === "Invalid") {
      errors.push(false, { error: "Invalid" })
    } else {
      errors.push(false, { error: "Validation Failed" })
    }
    if (errors.length > 0) return errors

    return true
  }
}

module.exports = Validator = new validator(
  keyStr,
  appNameStr,
  usernameStr,
  pwdStrings,
  zipStr,
  emailStr
)
