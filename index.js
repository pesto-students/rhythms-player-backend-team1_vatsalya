
require("dotenv").config();
const port = process.env.port || 3001
const mysql = require('mysql');
const express = require('express');
const cors = require("cors")
const bodyparser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyparser.json());

const router = require("./routes/api.js");

app.use(router);
app.get("/", (req, res) => {
    res.send("Server is Up");
})

app.listen(port, () => {
    console.log(`Started - Port : ${port}`);
})