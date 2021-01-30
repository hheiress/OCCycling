const pool = require("../db.js");

const find = () => {
    return pool.query("SELECT * FROM station").then((results) => (results.rows))
}

const create = (req, res) => {
   const station_name = req.body.station_name;

    if(!station_name) {
        return res
            .status(400)
            .send ("Please Insert a Station")
        } return pool
            .query("INSERT INTO station (station_name) VALUES ($1)", [station_name])
            .then(()=> res.send('Station created'))
   
}

function update (station)  {
    // ... update a station in db
}

function remove (id)  {
    // ... remove a station in db
}

module.exports = {
    find: find,
    create: create,
    update: update,
    remove: remove,
};