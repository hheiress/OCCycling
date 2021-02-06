const {usersRepo} =require("../repositories");
const ctrl = require("express").Router();

ctrl.get ("/", function (req, res) {
    usersRepo
        .find()
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.message)
            res.status(500).send("Internal Server Error")
        });
});

ctrl.post("/", function (req, res) {
    usersRepo
    .create(req, res)
    .then(() => res.send("User inserted!"))
    .catch((err) => {
        console.error(err.stack);
        res.status(500).send("Internal Server Error")
    });
});

ctrl.put("/:userId", function (req, res) {
    
});

ctrl.delete("/", function (req, res) {
    //... delete a user into the users table
});

module.exports = ctrl;