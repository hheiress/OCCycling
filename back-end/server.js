const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes.js");
const port = 3000;


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.use((req, res, next) => {
    const err = new Error("Not found")
    err.status = 404
    next(err)
});

//Error handler

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    });
});

app.listen(port, () => console.log(`Server is listening on port ${port}. Ready to accept requests!`))
