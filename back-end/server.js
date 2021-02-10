const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes.js");
const port = 5699;


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(routes);



app.listen(port, () => console.log(`Server is listening on port ${port}. Ready to accept requests!`))