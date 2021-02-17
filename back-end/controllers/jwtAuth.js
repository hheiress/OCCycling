const {jwtAuthRepo} = require("../repositories");
const ctrl = require("express").Router();
const validInfo = require("../middleware/validInfo");

ctrl.post("/register", validInfo, function (req, res)  {
    jwtAuthRepo
    .register(req, res)
    .catch((err) => {
        console.error(err.stack);
        res.status(500).send("Internal Server Error") // add handler error
    })
})

ctrl.post("/login", validInfo, function (req, res)  {
    jwtAuthRepo
    .login(req, res)
    .catch((err) => {
        console.error(err.stack);
        res.status(500).send("Internal Server Error") // add handler error
    })
})

module.exports = ctrl;