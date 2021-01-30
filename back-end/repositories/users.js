const pool = require("../db.js");


function find ()  {
    return pool.query("SELECT * FROM users").then((results) => (results.rows))
}

function create (req, res) {
    const {name, last_name, passport, adress, gender, date_birth, nationality, email, phone_number} = req.body;
    
    if (!name || !last_name || !passport || !adress || !gender || !date_birth || !nationality || !email || !phone_number) {
        return res
        .status(400)
        .send("Please insert a name, last name, passport, adress, gender, date birth, nationality, email, phone number");
    } return pool
                .query('INSERT INTO users (name, last_name, passport, adress, gender, date_birth, nationality, email, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [name, last_name, passport, adress, gender, date_birth, nationality, email, phone_number])
                .then(() => res.send(`User created`))
}

function update  (user)  {
    // ... update user in db
}

function remove  (id)  {
    // ... remove user in db
}

module.exports = {
    find: find,
    create: create,
    update: update,
    remove: remove,
};