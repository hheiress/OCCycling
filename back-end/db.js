const { Pool } = require("pg");

module.exports = new Pool({
    user: "postgres",
    host: "localhost",
    database: "occycling",
    password: "migracode20",
    port: 5432,
});