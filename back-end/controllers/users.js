const usersRepo = require("../repositories/users");
const ctrl = require("express").Router();

ctrl.get("/", function(req, res) {
    usersRepo
        .find()
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.message)
            res.status(500).send("Internal Server Error")
        });
});

ctrl.post("/", function(req, res) {
    console.log("control user")
    usersRepo
        .create(req, res)
        .catch((err) => {
            console.error(err.stack);
            res.status(500).send("Internal Server Error")
        });
});

ctrl.put("/:id", function(req, res) {
    usersRepo
        .update(req, res)
        .catch((err) => {
            console.error(err.message);
            res.status(500).send("Internal Server Error")
        })
});

ctrl.delete("/:id", function(req, res) {
    usersRepo
        .remove(req, res)
        .catch((err) => {
            console.log(err.message);
            res.status(500).send("Internal Server Error")
        })
});

module.exports = ctrl;