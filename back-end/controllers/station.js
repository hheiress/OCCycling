const {stationsRepo} = require("../repositories");
const ctrl = require("express").Router();

ctrl.get ("/", function (req, res, next) {
    stationsRepo
        .find()
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.stack)
            next( new Error("Internal Server Error2"))
        });
});

ctrl.post("/", function (req, res, next) {
    stationsRepo
    .create(req, res)
    .catch((err) => {
        console.error(err.stack)
            next( new Error("Internal Server Error"))
    })
});

ctrl.put("/", function (req, res) {
    //... put a station into the stations table
});

ctrl.delete("/", function (req, res) {
    //... delete a station into the stations table
});

module.exports = ctrl;