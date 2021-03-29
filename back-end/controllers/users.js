const {usersRepo} = require("../repositories");
const ctrl = require("express").Router();


ctrl.get ("/", function (req, res, next) {
    usersRepo
        .find()
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.stack)
            next( new Error ("Internal server error"))
        });
});

ctrl.post("/", function (req, res, next) {
    usersRepo
    .create(req, res)
    .catch((err) => {
        console.error(err.stack)
        next( new Error ("Internal server error"))
    });
});

ctrl.put("/:id", function(req, res, next) {
    usersRepo
        .update(req, res)
        .catch((err) => {
            console.error(err.stack);
            next( new Error ("Internal server error"))
        });
    });

ctrl.delete("/:id", function(req, res, next) {
    usersRepo
        .remove(req, res)
        .catch((err) => {
            console.log(err.stack);
            next( new Error ("Internal server error"))
        });
 });

module.exports = ctrl;