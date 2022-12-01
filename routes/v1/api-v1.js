let mysql = require('mysql');
const config = require("../../config/dbconfig");
const router = require("express").Router();

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
})

router.post("/v1/register", (req, res) => {
    const { fname, lname, email, password } = req.body;
    let connection = mysql.createConnection(config);
    let sql = `CALL SP_RegisterUser(?,?,?,?)`;
    connection.query(sql, [fname, lname, email, password], (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results[0]);
        connection.end();
        res.json(results[0]);
    });
})

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
})


module.exports = router;