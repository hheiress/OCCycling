const {usersRepo} = require("../repositories");
const ctrl = require("express").Router();
const multer = require("multer")

ctrl.get ("/", function (req, res, next) {
    usersRepo
        .find()
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.stack)
            next( new Error ("Internal server error"))
        });
});

ctrl.get ("/:id", function (req, res, next) {
    usersRepo
        .findUser(req)
        .then((results) => res.json(results))
        .catch((err) => {
            console.error(err.stack)
            next( new Error ("Internal server error"))
        });
});

const upload = multer({
    limits:{fileSize:10000000
    },
})

ctrl.post("/", upload.single("user_photo"), function (req, res, next) {
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

ctrl.put("/update/:id", function(req, res, next) {
    usersRepo
        .updateUserStatus(req, res)
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