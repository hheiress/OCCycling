const rentingsRepo = require("../repositories/rentings");
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

ctrl.put("/:id", function(req, res) {
    rentingsRepo
        .update(req, res)
        .catch((err) => {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        })
});

ctrl.delete("/:id", function(req, res) {
    rentingsRepo
        .remove(req, res)
        .catch((err) => {
            console.log(err.message);
            res.status(500).send("Internal Server Error")
        })
});

module.exports = ctrl;