const {stationsRepo} = require("../repositories");
const ctrl = require("express").Router();

ctrl.get ("/", function (req, res) {
    stationsRepo
        .find()
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.message)
            res.status(500).send("Internal Server Error")
        });
});

ctrl.post("/", function (req, res) {
    stationsRepo
    .create(req, res)
    .then(() => res.send("Station inserted"))
    .catch((err) => {
        console.error(err.stack);
        res.status(500).send("Internal Server Error")
    })
});

ctrl.put("/", function (req, res) {
    //... put a station into the stations table
});

ctrl.delete("/", function (req, res) {
    //... delete a station into the stations table
});

module.exports = ctrl;