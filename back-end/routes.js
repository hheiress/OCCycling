const router = require("express").Router();

const {
    userCtrl,
    bikeCtrl,
    rentingCtrl,
    stationCtrl,
    registroCtrl,
} = require("./controllers");

//ENDPOINTS

router
    .use("/users", userCtrl)
    .use("/bikes", bikeCtrl)
    .use("/rentings", rentingCtrl)
    .use("/station", stationCtrl)
    .use("/registros", registroCtrl)

module.exports = router;