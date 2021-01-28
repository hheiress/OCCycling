const router = require("express").Router();

const { 
    userCtrl, 
    bikeCtrl, 
    rentingCtrl,
    stationCtrl,
} = require("./controllers");
//ENDPOINTS

router
    .use("/users", userCtrl)
    .use("/bikes", bikeCtrl)
    .use("/rentings", rentingCtrl)
    .use("/station", stationCtrl);

module.exports = router;