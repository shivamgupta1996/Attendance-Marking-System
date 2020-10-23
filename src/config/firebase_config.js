if (process.env.NODE_ENV === "development") {
    console.log(process.env.NODE_ENV)
    module.exports = require("./firebase_dev")
} else {
    console.log(process.env.NODE_ENV)
    module.exports = require("./firebase_prod")
}