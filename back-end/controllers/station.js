const stationsRepo = require("../repositories/station");
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

ctrl.put("/:id", function(req, res) {
    stationsRepo
        .update(req, res)
        .catch((err) => {
            console.error(err.message);
            res.status(500).send("Internal Server Error")
        })
});

ctrl.delete("/:id", function(req, res) {
    stationsRepo
        .remove(req, res)
        .catch((err) => {
            console.log(err.message);
            res.status(500).send("Internal Server Error")
        })
});

module.exports = ctrl;