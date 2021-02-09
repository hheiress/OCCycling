const { bikesRepo } = require("../repositories");
const ctrl = require("express").Router();

ctrl.get ("/", function (req, res, next) {
    bikesRepo
        .find()
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.stack)
            next( new Error("Internal Server Error"))
        });
});

ctrl.post("/", function (req, res, next) {
    bikesRepo
    .create(req, res)
    .catch((err) => {
        console.error(err.stack);
        next( new Error("Internal Server Error"))
    });
});

ctrl.put("/", function (req, res) {
    //... put a bike into the bikes table
});

ctrl.delete("/", function (req, res) {
    //... delete a bike into the bikes table
});

module.exports = ctrl;