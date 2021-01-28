const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes.js");
const port = 3000;


const app = express();
app.use(bodyParser.json());
app.use(routes);



app.listen(port, () => console.log(`Server is listening on port ${port}. Ready to accept requests!`))
