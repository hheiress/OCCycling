const bikesRepo = require("../repositories/bikes");
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

ctrl.put("/:id", function(req, res) {
    bikesRepo
        .update(req, res)
        .catch((err) => {
            console.error(err.message);
            res.status(500).send("Internal Server Error")
        })
});

ctrl.delete("/:id", function(req, res) {
    bikesRepo
        .remove(req, res)
        .catch((err) => {
            console.log(err.message);
            res.status(500).send("Internal Server Error")
        })
});
module.exports = ctrl;