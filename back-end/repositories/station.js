const { Pool } = require("pg");

const pool = new Pool({
    user: "pepe",
    host: "localhost",
    database: "occycling",
    password: "pepe1234",
    port: 5432,
});

const find = () => {
    return pool.query("SELECT * FROM station").then((results) => (results.rows))
}

const create = (station) => {
    // ... create a station in db
}

const update = (station) => {
    // ... update a station in db
}

const remove = (id) => {
    // ... remove a station in db
}

module.exports = {
    find: find,
    create: create,
    update: update,
    remove: remove,
};