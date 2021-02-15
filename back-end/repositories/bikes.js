const pool = require("../db.js");

function find () {
    return pool.query("SELECT b.id, b.model_name, r.status, b.entry_date, b.conditions FROM bikes b LEFT JOIN rentings r ON r.bike_id = b.id").then((results) => (results.rows))
}

function create(req, res) {
    const { model_name, entry_date, conditions } = req.body;

    if (!model_name || !entry_date || !conditions) {
        return res
            .status(400)
            .send("Please insert a model name, entry date, conditions");
    }
    return pool
        .query('INSERT INTO bikes (model_name, entry_date, conditions) VALUES ($1, $2, $3)', [model_name, entry_date, conditions])
        .then(() => res.send('Bike created'))
}

function update(req, res) {
    const { model_name, entry_date, conditions } = req.body;
    const { id } = req.params;
    if (!model_name || !entry_date || !conditions) {
        return res
            .status(400)
            .send("Please insert a model name, entry date, conditions");
    }
    return pool
        .query("update bikes set model_name  =$2, entry_date = $3, conditions = $4 where id = $1", [id, model_name, entry_date, conditions])
        .then(() => res.send('Bike Modified'))
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
    remove: remove,
};