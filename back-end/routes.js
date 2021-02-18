const router = require("express").Router();

const { 
    userCtrl, 
    bikeCtrl, 
    rentingCtrl,
    stationCtrl,
    jwtAuthCtrl,
    dashboardCtrl,
} = require("./controllers");


//ENDPOINTS

router
    .use("/users", userCtrl)
    .use("/bikes", bikeCtrl)
    .use("/rentings", rentingCtrl)
    .use("/station", stationCtrl)
    .use("/auth", jwtAuthCtrl)
    .use("/dashboard", dashboardCtrl),

module.exports = router;