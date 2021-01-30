const pool = require("../db.js");

const find = () => {
    return pool.query("SELECT * FROM bikes").then((results) => (results.rows))
}

function create (req, res) {
    const {model_name, entry_date, conditions} = req.body;

    if (!model_name || !entry_date || !conditions) {
        return res
        .status(400)
        .send("Please insert a model name, entry date, conditions");
    } return pool
            .query('INSERT INTO bikes (model_name, entry_date, conditions) VALUES ($1, $2, $3)', [model_name, entry_date, conditions])
            .then(() => res.send('Bike created'))
}

function update  (bike)  {
    // ... update bike in db
}

function remove  (id)  {
    // ... remove bike in db
}

module.exports = {
    find: find,
    create: create,
    update: update,
    remove: remove,
};