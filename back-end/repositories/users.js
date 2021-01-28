const { Pool } = require("pg");

const pool = new Pool({
    user: "pepe",
    host: "localhost",
    database: "occycling",
    password: "pepe1234",
    port: 5432,
});


//Anny aqui puedes usar cualquiera de las dos formas, nombrar una function o una callback function
function find ()  {
    return pool.query("SELECT * FROM users").then((results) => (results.rows))
}

const create = (user) => {
    // ... create user in db
}

const update = (user) => {
    // ... update user in db
}

const remove = (id) => {
    // ... remove user in db
}

module.exports = {
    find: find,
    create: create,
    update: update,
    remove: remove,
};