const {usersRepo} =require("../repositories");
const ctrl = require("express").Router();

ctrl.get ("/", function (req, res, next) {
    usersRepo
        .find()
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.stack)
            next( new Error("Internal Server Error"))
        });
});

ctrl.post("/", function (req, res, next) {
    usersRepo
    .create(req, res)
    .catch((err) => {
        console.error(err.stack)
        next( new Error("Internal Server Error"))
    });
});

ctrl.put("/:userId", function (req, res) {
    
});

ctrl.delete("/", function (req, res) {
    //... delete a user into the users table
});

module.exports = ctrl;