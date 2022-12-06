require("dotenv").config();
const port = process.env.port || 3001;
const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
var axios = require("axios");
const app = express();
app.use(cors());
app.use(bodyparser.json());

const router = require("./routes/api.js");

app.use(router);
app.get("/", (req, res) => {
  res.send("Server is Up");
});
//   testing
app.get("/lyrics", (req, res) => {
  //musixmatch URL
  const musixMatchApiKey = `17dec0e1673916834f5044a23b8107d4`;
  const { name } = req.body;
  const { artistName } = req.body;

  var config = {
    method: "get",
    url: `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=json&q_track=${name}&q_artist=${artistName}&apikey=${musixMatchApiKey}`,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send(response.data);
      res.end();
    })
    .catch(function (error) {
      console.log(error);
    });
});
// test end
app.listen(port, () => {
  console.log(`Started - Port : ${port}`);
});
