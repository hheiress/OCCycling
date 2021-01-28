const { Pool } = require("pg");

const pool = new Pool({
    user: "pepe",
    host: "localhost",
    database: "occycling",
    password: "pepe1234",
    port: 5432,
});

const find = () => {
    return pool.query("SELECT * FROM bikes").then((results) => (results.rows))
}

const create = (bike) => {
    // ... create bike in db
}

const update = (bike) => {
    // ... update bike in db
}

const remove = (id) => {
    // ... remove bike in db
}

module.exports = {
    find: find,
    create: create,
    update: update,
    remove: remove,
};