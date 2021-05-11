const pool = require("../db.js");

function find () {
    return pool.query("SELECT b.id, b.model_name, b.status, b.entry_date, b.conditions, s.station_name FROM bikes b LEFT JOIN rentings r ON r.bike_id = b.id JOIN station s ON b.station_id=s.id;").then((results) => (results.rows))
}

function create(req, res) {
    const { model_name, status, entry_date, conditions, station_id } = req.body;

    if (!model_name || !status || !entry_date  || !conditions || !station_id) {
        return res
            .status(400)
            .send("Please insert a model name, status, entry date, conditions, station");
    }
    return pool
        .query('INSERT INTO bikes (model_name, status, entry_date, conditions, station_id) VALUES ($1, $2, $3, $4, $5)', [model_name, status, entry_date, conditions, station_id])
        .then(() => res.send('Bike created'))
}

function update(req, res) {
    const { model_name, status, entry_date, conditions, station_id } = req.body;
    const { id } = req.params;
    if (!model_name || !status || !entry_date || !conditions || !station_id) {
        return res
            .status(400)
            .send("Please insert a model name, entry date, conditions, station");
    }
    return pool
        .query("UPDATE bikes SET model_name  =$2, status=$3, entry_date = $4, conditions = $5, station_id = $6 WHERE id = $1", [id, model_name, status, entry_date, conditions, station_id])
        .then(() => res.send('Bike Modified'))
}

async function updateBikeStatus(req, res) {
    const { status, station_id } = req.body;
    const { id } = req.params;
    console.log(station_id)
    if (!status || !station_id) {
        return res
            .status(400)
            .send("Please insert a status, station_id");
    }

    let bike = await pool.query("SELECT * FROM bikes WHERE id = $1", [id])
    if(bike.rows.length > 0) {
        console.log(bike)    
        bike = await pool.query("UPDATE bikes SET status=$2, station_id = $3 WHERE id = $1", [bike.rows[0].id , status, station_id])
    }
    
    return res.send({message: 'Bike Modified', bike})

}

async function deleteBikeStatus(req, res) {
    const { status } = req.body;
    const { id } = req.params;
    if (!status) {
        return res
            .status(400)
            .send("Please insert a new status");
    }

    let bike = await pool.query("SELECT * FROM bikes WHERE id = $1", [id])
    if(bike.rows.length > 0) {
        console.log(bike)    
        bike = await pool.query("UPDATE bikes SET status=$2 WHERE id = $1", [bike.rows[0].id , status])
    }
    
    return res.send({message: 'Bike Modified', bike})

}
function remove(req, res) {
    const { id } = req.params;
    if (!id) {
        return res
            .status(400)
            .send("Please insert a id");
    }
    return pool
        .query("DELETE FROM bikes WHERE id = $1", [id])
        .then(() => res.send('Bike Eliminated'))

}

module.exports = {
    find: find,
    create: create,
    update: update,
    updateBikeStatus:updateBikeStatus,
    deleteBikeStatus:deleteBikeStatus,
    remove: remove,
};