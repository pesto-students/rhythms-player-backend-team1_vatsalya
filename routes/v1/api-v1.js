const { Connection } = require("mongoose");
let mysql = require("mysql");
const config = require("../../config/dbconfig");
const router = require("express").Router();
const queries = require("../../config/sql");

router.get("/testmysql", (req, res) => {
  let connection = mysql.createConnection(config);
  let sql = `CALL SP_Test()`;
  connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    connection.end();
    res.json(results[0]);
  });
});

router.post("/v1/register", (req, res) => {
  const { fname, lname, email, password } = req.body;
  let connection = mysql.createConnection(config);
  let sql = `CALL SP_RegisterUser(?,?,?,?)`;
  connection.query(
    sql,
    [fname, lname, email, password],
    (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      console.log(results[0]);
      connection.end();
      res.json(results[0]);
    }
  );
});

router.post("/v1/login", (req, res) => {
  const { email, pwd } = req.body;
  let connection = mysql.createConnection(config);
  let sql = `CALL SP_LoginUser(?,?)`;
  connection.query(sql, [email, pwd], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    connection.end();
    res.json(results[0]);
  });
});
// get liked songs list
router.get("/v1/liked-songs", (req, res) => {
  const userId = 3; // this need to be changed with each user
  let connection = mysql.createConnection(config);
  let sql = queries.getLiked;
  connection.query(sql, [userId], (error, results, fields) => {
    if (error) {
      return console.error(error);
    }
    console.log(results);
    res.json(results);
    connection.end();
  });
});
// like song
router.post("/v1/like-song", (req, res) => {
  const { song_id } = req.body;
  //   const song_id = "5RrOyaV2xOAnf62uWj24dB";

  const isoDate = new Date();
  const mySQLDateString = isoDate.toJSON().slice(0, 19).replace("T", " ");
  const userId = 3; // this need to be changed with each user
  let connection = mysql.createConnection(config);
  let sql = queries.like;
  connection.query(
    sql,
    [song_id, userId, mySQLDateString],
    (error, results, fields) => {
      if (error) {
        return console.error(error);
      }
      console.log(results);
      res.json({ status: "success" });
      connection.end();
    }
  );
});
router.post("v1/unlike", (req, res) => {
  const { song_id } = req.body;
  let connection = mysql.createConnection(config);
  const user_id = 3; //this need to change every time for different user
  let sql = queries.unlike;
  connection.query(sql, [song_id, user_id], (error, results, fields) => {
    if (error) {
      return console.log(error);
    }
    console.log(result);
  });
});

module.exports = router;
