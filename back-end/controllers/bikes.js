const { bikesRepo } = require("../repositories");
const ctrl = require("express").Router();

ctrl.get ("/", function (req, res) {
    bikesRepo
        .find()
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.message)
            res.status(500).send("Internal Server Error")
        });
});

ctrl.post("/", function (req, res) {
    console.log("control user bike")
    bikesRepo
    .create(req, res)
    .then(() => res.send("Bike Inserted!"))
    .catch((err) => {
        console.error(err.stack);
        res.status(500).send("Internal Server Error")
    });
});

ctrl.put("/", function (req, res) {
    //... put a bike into the bikes table
});

ctrl.delete("/", function (req, res) {
    //... delete a bike into the bikes table
});

module.exports = ctrl;