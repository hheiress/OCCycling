const registrosRepo = require("../repositories/registros");
const ctrl = require("express").Router();

ctrl.get("/", function(req, res) {
    registrosRepo
        .find()
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.message)
            res.status(500).send("Internal Server Error")
        });
});

ctrl.post("/", function(req, res) {
    console.log("control registros")
    registrosRepo
        .create(req, res)
        .catch((err) => {
            console.error(err.stack);
            res.status(500).send("Internal Server Error")
        });
});

ctrl.put("/:id", function(req, res) {
    registrosRepo
        .update(req, res)
        .catch((err) => {
            console.error(err.message);
            res.status(500).send("Internal Server Error")
        })
});

ctrl.delete("/:id", function(req, res) {
    registrosRepo
        .remove(req, res)
        .catch((err) => {
            console.log(err.message);
            res.status(500).send("Internal Server Error")
        })
});
module.exports = ctrl;