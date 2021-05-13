const pool = require("../db.js");


function find() {
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

function update(req, res) {
    const { name, last_name, passport, address, gender, date_birth, nationality, email, phone_number, status } = req.body;
    const { id } = req.params;
    if (!name || !last_name || !passport || !address || !gender || !date_birth || !nationality || !email || !phone_number || !status) {
        return res
            .status(400)
            .send("Please insert a name, last name, passport, address, gender, date birth, nationality, email, phone number, status");
    }
    return pool
        .query("UPDATE users SET name = $2, last_name = $3, passport = $4, address = $5, gender = $6, date_birth = $7, nationality = $8, email = $9, phone_number = $10, status=$11 WHERE id = $1", [id, name, last_name, passport, address, gender, date_birth, nationality, email, phone_number, status])
        .then(() => res.send('User Modified'))
}

async function updateUserStatus(req, res) {
    const { status } = req.body;
    const { id } = req.params;
    if (!status) {
        return res
            .status(400)
            .send("Please insert a status");
    }
    let user = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    if(user.rows.length > 0) {
        console.log(user)     
        user= await pool.query("UPDATE users SET status=$2 WHERE id = $1", [user.rows[0].id, status])
    }
    return res.send({message:'User Status Modified', user})

}
function remove(req, res) {
    const { id } = req.params;
    if (!id) {
        return res
            .status(400)
            .send("Please insert a id");
    }
    return pool
        .query("DELETE FROM users WHERE id = $1", [id])
        .then(() => res.send('User Eliminated'))

}

module.exports = {
    find: find,
    create: create,
    update: update,
    updateUserStatus:updateUserStatus,
    remove: remove,
};