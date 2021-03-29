const fs = require("fs");
const pool = require("../db.js");

pool
  .query(fs.readFileSync("migrations/initial_db.sql").toString())
  .then(() => {
    console.info("Migration successful!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });