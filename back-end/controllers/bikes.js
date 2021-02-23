const {bikesRepo} = require("../repositories");
const ctrl = require("express").Router();


ctrl.get ("/", function (req, res, next) {
    bikesRepo
        .find()
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.stack)
            next(Error)
        });
});

ctrl.post("/", function (req, res, next) {
    bikesRepo
    .create(req, res)
    .catch((err) => {
        console.error(err.stack)
        next(Error)
    });
});

ctrl.put("/:id", function(req, res, next) {
    bikesRepo
        .update(req, res)
        .catch((err) => {
            console.error(err.stack)
            next(Error)
        })
});

ctrl.delete("/:id", function(req, res, next) {
    bikesRepo
        .remove(req, res)
        .catch((err) => {
            console.error(err.stack)
            next(Error)
        })
});

module.exports = ctrl;