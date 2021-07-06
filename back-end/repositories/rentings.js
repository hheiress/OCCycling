const pool = require("../db.js");

const find = () => {
    return pool.query("SELECT r.id, b.model_name, r.user_id, u.name, u.last_name, r.status, renting_date, s.station_name, starting_time, b.conditions, r.finished_date FROM rentings r JOIN bikes b ON b.id=r.bike_id JOIN users u ON u.id=r.user_id JOIN station s ON s.id=r.station_id;").then((results) => (results.rows))
}

function create  (req, res)  {
    const {bike_id, user_id, last_name, status, renting_date, station_id, starting_time, conditions_id} = req.body;
     (req.body)
    if(!bike_id || !user_id || !last_name || !status || !renting_date || !station_id || !starting_time || !conditions_id) {
        return res
        .status(400)
        .send("Please insert a bike id, user id, status, renting date, station id, starting time, conditions");
    } return pool
            .query('INSERT INTO rentings (bike_id, user_id, last_name, status, renting_date, station_id, starting_time, conditions_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [bike_id, user_id, last_name, status, renting_date, station_id, starting_time, conditions_id])
            .then(() => res.send('Renting created'))
    }
    

function update(req, res) {
    const { bike_id, user_id, last_name, status, renting_date, station_id, starting_time, conditions_id, finished_date } = req.body;
    const { id } = req.params;
     if (!bike_id 
        || !user_id 
        || !last_name 
        || !status 
        || !renting_date 
        || !station_id
        || !starting_time 
        || !conditions_id 
        || !finished_date) {
        return res
            .status(400)
            .send("Please insert a bike id, user id, last_name, status, renting date, station id, time left, conditions");
    }
    return pool
        .query("UPDATE rentings SET bike_id = $2, user_id = $3, last_name=$4, status = $5, renting_date =$6, station_id = $7, starting_time = $8, conditions_id = $9, finished_date = $10 WHERE id = $1", [id, bike_id, user_id, last_name, status, renting_date, station_id, starting_time, conditions_id, finished_date])
        .then(() => res.send('Renting Modified'))
}

async function updateRentingDate(req, res) {
    const { status, finished_date } = req.body;
    const { id } = req.params;
    if (!status || !finished_date) {
        return res
            .status(400)
            .send("Please insert a status, finished_date");
    }
    let renting = await pool.query("SELECT * FROM rentings WHERE id = $1", [id])
    if(renting.rows.length > 0){
        (renting) 
        renting = await pool.query("UPDATE rentings SET status=$2, finished_date = $3 WHERE id = $1", [renting.rows[0].id, status, finished_date])
    }
    return res.send({message:'Renting Modified', renting})

}
function remove(req, res) {
    const { id } = req.params;
    if (!id) {
        return res
            .status(400)
            .send("Please insert a id");
    }
    return pool
        .query("DELETE FROM rentings WHERE id = $1", [id])
        .then(() => res.send('Renting Eliminated'))

}

module.exports = {
    find: find,
    create: create,
    update: update,
    updateRentingDate:updateRentingDate,
    remove: remove,
};