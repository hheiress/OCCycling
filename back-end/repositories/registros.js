const pool = require("../db.js");

const find = () => {
    return pool.query("SELECT * FROM registros").then((results) => (results.rows))
}

function create(req, res) {
    const { name, last_name, email, pasword, phone_number } = req.body;
    console.log(req.body);

    if (!name || !last_name || !email || !pasword || !phone_number) {
        return res
            .status(400)
            .send("Please insert a name, last_name, email, pasword, phone_number");
    }
    return pool
        .query('INSERT INTO registros (name, last_name, email, pasword, phone_number) VALUES ($1, $2, $3, $4, $5)', [name, last_name, email, pasword, phone_number])
        .then(() => res.send('Registro created'))
}

function update(req, res) {
    const { name, last_name, email, pasword, phone_number } = req.body;
    const { id } = req.params;
    if (!name || !last_name || !email || !pasword || !phone_number) {
        return res
            .status(400)
            .send("Please insert a name, last_name, email, pasword, phone_number");
    }
    return pool
        .query("update registros set name  =$2, last_name = $3, email = $4, pasword = $5, phone_number = $6 where id = $1", [id, name, last_name, email, pasword, phone_number])
        .then(() => res.send('Registro Modified'))
}

function remove(req, res) {
    const { id } = req.params;
    if (!id) {
        return res
            .status(400)
            .send("Please insert a id");
    }
    return pool
        .query("DELETE FROM registros WHERE id = $1", [id])
        .then(() => res.send('Registro Eliminated'))
}

module.exports = {
    find: find,
    create: create,
    update: update,
    remove: remove,
};