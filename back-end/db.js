const { Pool } = require("pg");

const pool = new Pool({
    user: "pepe",
    host: "localhost",
    database: "occycling",
    password: "pepe1234",
    port: 5432,
});

module.exports = pool;


