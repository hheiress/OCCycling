const repo = require("../repositories/rentings.js");
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
    //... post a renting into the rentings table
});

ctrl.put("/", function (req, res) {
    //... put a renting into the rentings table
});

ctrl.delete("/", function (req, res) {
    //... delete a renting into the rentings table
});

module.exports = ctrl;