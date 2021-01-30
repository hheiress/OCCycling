const {rentingsRepo} = require("../repositories");
const ctrl = require("express").Router();

ctrl.get ("/", function (req, res) {
    rentingsRepo
        .find()
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.message)
            res.status(500).send("Internal Server Error")
        });
});

ctrl.post("/", function (req, res) {
    rentingsRepo
    .create(req, res)
    .then(() => res.send("Renting Inserted!"))
    .catch((err) => {
        console.error(err.stack);
        res.status(500).send("Internal Server Error")
    });
});

ctrl.put("/", function (req, res) {
    //... put a renting into the rentings table
});

ctrl.delete("/", function (req, res) {
    //... delete a renting into the rentings table
});

module.exports = ctrl;