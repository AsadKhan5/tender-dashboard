const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tender",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Connection callback function
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the database!");
  // Release the connection
  connection.release();
});

module.exports = pool.promise();
