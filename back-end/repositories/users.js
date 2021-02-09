const pool = require("../db.js");


function find ()  {
    return pool.query("SELECT * FROM users").then((results) => (results.rows))
}

function create (req, res) {
    const {name, last_name, passport, address, gender, date_birth, nationality, email, phone_number, status} = req.body;
    
    if (!name || !last_name || !passport || !address || !gender || !date_birth || !nationality || !email || !phone_number || !status) {
        return res
        .status(400)
        .send("Please insert a name, last name, passport, address, gender, date birth, nationality, email, phone number, status");
    } return pool
                .query('INSERT INTO users (name, last_name, passport, address, gender, date_birth, nationality, email, phone_number, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [name, last_name, passport, address, gender, date_birth, nationality, email, phone_number, status])
                .then(() => res.send(`User created`))
}

function update  (req, res)  {
   
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