const { Pool } = require("pg");

module.exports = new Pool({
    user: "pepe",
    host: "localhost",
    database: "occycling",
    password: "pepe1234",
    port: 5432,
});