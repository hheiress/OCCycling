const repo = require("../repositories/station.js");
const ctrl = require("express").Router();

ctrl.get ("/", function (req, res) {
    repo
        .find()
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.message)
            res.status(500).send("Internal Server Error")
        });
});

ctrl.post("/", function (req, res) {
    //... post a station into the stations table
});

ctrl.put("/", function (req, res) {
    //... put a station into the stations table
});

ctrl.delete("/", function (req, res) {
    //... delete a station into the stations table
});

module.exports = ctrl;