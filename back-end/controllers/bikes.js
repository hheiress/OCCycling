const repo = require("../repositories/bikes.js");
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
    //... post a bike into the bikes table
});

ctrl.put("/", function (req, res) {
    //... put a bike into the bikes table
});

ctrl.delete("/", function (req, res) {
    //... delete a bike into the bikes table
});

module.exports = ctrl;