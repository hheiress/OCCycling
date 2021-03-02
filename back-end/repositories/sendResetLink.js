const pool = require("../db.js");
import sendEmail from "../utils/sendEmail.js";

async function sendResetLink ( req, res) {
    try {
     const { email } = req.body;
     
     const user = await
        pool
        .query("SELECT * FROM ngo_users WHERE user_email = $1", [email]);

        if (!user) {
            return res.status(404).send( { error: "User not found"} );
        }
    } catch (err) {
        console.log(err.stack)
        res.status(500).send("Internal server error")
    }
}

module.exports = {

sendResetLink: sendResetLink,

};