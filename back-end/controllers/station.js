const stationsRepo = require("../repositories/station");
const ctrl = require("express").Router();

ctrl.get("/", function(req, res) {
    stationsRepo
        .find()
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.message)
            res.status(500).send("Internal Server Error")
        });
});

ctrl.post("/", function(req, res) {
    stationsRepo
        .create(req, res)
        .catch((err) => {
            console.error(err.stack);
            res.status(500).send("Internal Server Error")
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