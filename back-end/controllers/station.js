const {stationsRepo} = require("../repositories");
const ctrl = require("express").Router();


ctrl.get ("/", function (req, res, next) {
    stationsRepo
        .find()
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.stack)
            next(Error)
        });
});

ctrl.post("/", function (req, res, next) {
    stationsRepo
    .create(req, res)
    .catch((err) => {
        console.error(err.stack)
        next(Error)
    })
});

ctrl.put("/:id", function(req, res, next) {
    stationsRepo
        .update(req, res)
        .catch((err) => {
            console.error(err.message);
            next(Error)
        })
});

ctrl.delete("/:id", function(req, res, next) {
    stationsRepo
        .remove(req, res)
        .catch((err) => {
            console.log(err.message);
            next(Error)
        })
});

module.exports = ctrl;