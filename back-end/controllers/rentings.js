const {rentingsRepo} = require("../repositories");
const ctrl = require("express").Router();

ctrl.get ("/", function (req, res, next) {
    rentingsRepo
        .find()
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.stack)
            next( new Error("Internal Server Error"))
        });
});

ctrl.post("/", function (req, res, next) {
    rentingsRepo
    .create(req, res)
    .catch((err) => {
        console.error(err.stack)
            next( new Error("Internal Server Error"))
    });
});

ctrl.put("/", function (req, res) {
    //... put a renting into the rentings table
});

ctrl.delete("/", function (req, res) {
    //... delete a renting into the rentings table
});

module.exports = ctrl;