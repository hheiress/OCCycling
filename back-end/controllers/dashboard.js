const {dashboardRepo} = require("../repositories");
const ctrl = require("express").Router();
const authorization = require("../middleware/authorization");

ctrl.get("/", authorization, function (req, res)  {
    dashboardRepo
    .dashboard(req, res)
    .catch((err) => {
        console.error(err.stack);
        res.status(500).send("Internal Server Error")
    })
})

module.exports = ctrl;