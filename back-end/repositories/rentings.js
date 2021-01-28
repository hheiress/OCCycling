const { Pool } = require("pg");

const pool = new Pool({
    user: "pepe",
    host: "localhost",
    database: "occycling",
    password: "pepe1234",
    port: 5432,
});

const find = () => {
    return pool.query("SELECT * FROM rentings").then((results) => (results.rows))
}

const create = (renting) => {
    // ... create a renting in db
}

const update = (renting) => {
    // ... update a renting in db
}

const remove = (id) => {
    // ... remove a renting in db
}

module.exports = {
    find: find,
    create: create,
    update: update,
    remove: remove,
};