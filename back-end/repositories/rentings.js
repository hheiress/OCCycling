const pool = require("../db.js");

const find = () => {
    return pool.query("SELECT r.id, b.model_name, u.name, u.last_name, r.status, renting_date, s.station_name, starting_time, b.conditions FROM rentings r JOIN bikes b ON b.id=r.bike_id JOIN users u ON u.id=r.user_id JOIN station s ON s.id=r.station_id;").then((results) => (results.rows))
}

function create  (req, res)  {
    const {bike_id, user_id, status, renting_date, station_id, starting_time, conditions_id} = req.body;

    if(!bike_id || !user_id || !status || !renting_date || !station_id || !starting_time || !conditions_id) {
        return res
        .status(400)
        .send("Please insert a bike id, user id, status, renting date, station id, starting time, conditions");
    } return pool
            .query('INSERT INTO rentings (bike_id, user_id, status, renting_date, station_id, starting_time, conditions_id) VALUES ($1, $2, $3, $4, $5, $6, $7)', [bike_id, user_id, status, renting_date, station_id, starting_time, conditions_id])
            .then(() => res.send('Renting created'))
    }


function update  (renting) {
    // ... update a renting in db
}

function remove  (id) {
    // ... remove a renting in db
}

module.exports = {
    find: find,
    create: create,
    update: update,
    remove: remove,
};