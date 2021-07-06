const pool = require("../db.js");
const sharp = require('sharp');

function find () {
    const results = pool.query("SELECT b.id, b.model_name, b.status, b.entry_date, b.conditions, s.station_name FROM bikes b JOIN station s ON b.station_id=s.id;").then((results) => (results.rows))
    return results;
}

async function findBike(req) {
    return await pool.query("SELECT * FROM bikes WHERE id = $1", [req.params.id]).then((results) => (results.rows[0]))
}

async function getBikePhoto(req) {
    return await pool.query("SELECT * FROM bike_photos WHERE bike_id = $1", [req.params.id]).then((results) => (results.rows[0].filedata))
}

async function create(req, res) {
    const { model_name, status, entry_date, conditions, station_id } = req.body;
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    if (!model_name || !status || !entry_date  || !conditions || !station_id) {
        return res
            .status(400)
            .send("Please insert a model name, status, entry date, conditions, station");
    }
    return pool
        .query('INSERT INTO bikes (model_name, status, entry_date, conditions, station_id) VALUES ($1, $2, $3, $4, $5) RETURNING id', [model_name, status, entry_date, conditions, station_id])
        .then((data) => pool.query('INSERT INTO bike_photos (bike_id, filename, mimetype, filedata) VALUES ($1, $2, $3, $4)', [data.rows[0].id, req.file.originalname, req.file.mimetype, buffer]))
        .then(() => res.send('Bike created'))
}

async function update(req, res) {
    const { model_name, status, entry_date, conditions, station_id } = req.body;
    const { id } = req.params;
    if (!model_name || !status || !entry_date || !conditions || !station_id) {
        return res
            .status(400)
            .send("Please insert a model name, entry date, conditions, station");
    }
   try  { 
       await pool
        .query("UPDATE bikes SET model_name  =$2, status=$3, entry_date = $4, conditions = $5, station_id = $6 WHERE id = $1", [id, model_name, status, entry_date, conditions, station_id])
        if(req.file.buffer){
            const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
            await pool.query("UPDATE bike_photos SET filename = $2, mimetype = $3, filedata = $4 WHERE user_id = $1", [id, req.file.originalname, req.file.mimetype, buffer])
        }
        return res.send('Bike Modified')
    } catch (error){
        return res.send(error.message)
    }
}

async function updateBikeStatus(req, res) {
    const { status, station_id } = req.body;
    const { id } = req.params;
    (station_id)
    if (!status || !station_id) {
        return res
            .status(400)
            .send("Please insert a status, station_id");
    }
    let bike = await pool.query("SELECT * FROM bikes WHERE id = $1", [id])
    if(bike.rows.length > 0) {
        (bike)    
        bike = await pool.query("UPDATE bikes SET status=$2, station_id = $3 WHERE id = $1", [bike.rows[0].id , status, station_id])
    } 
    return res.send({message: 'Bike Modified', bike})
}
async function updateNewStatus(req, res) {
    const { status } = req.body;
    console.log(req.body)
    const { id } = req.params;
    if (!status) {
        return res
            .status(400)
            .send("Please insert a status");
    }
    let bike = await pool.query("SELECT * FROM bikes WHERE id = $1", [id])
    if(bike.rows.length > 0) {
        (bike)     
        bike= await pool.query("UPDATE bikes SET status=$2 WHERE id = $1", [bike.rows[0].id, status])
    }
    return res.send({message:'Bike Status Modified', bike})

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
        (bike)    
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
    findBike:findBike,
    getBikePhoto:getBikePhoto,
    create: create,
    update: update,
    updateBikeStatus:updateBikeStatus,
    updateNewStatus:updateNewStatus,
    deleteBikeStatus:deleteBikeStatus,
    remove: remove,
};