const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_midtest",
});

exports.db = db;
