const router = require("express").Router();

const { 
    userCtrl, 
    bikeCtrl, 
    rentingCtrl,
    stationCtrl,
    locationCtrl,
    jwtAuthCtrl,
    dashboardCtrl,
    resetLinkCtrl,
} = require("./controllers");



//ENDPOINTS

router
    .use("/users", userCtrl)
    .use("/bikes", bikeCtrl)
    .use("/rentings", rentingCtrl)
    .use("/station", stationCtrl)
    .use("/location", locationCtrl)
    .use("/auth", jwtAuthCtrl)
    .use("/dashboard", dashboardCtrl)
    .use("/resetlink", resetLinkCtrl),

module.exports = router;