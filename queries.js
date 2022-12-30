const { query } = require("express");

const Pool = require("pg").Pool;
require("dotenv").config();

const DB_URL = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: DB_URL,
  ssl: process.env.DATABASE_URL ? true : false,
});

//getusers
const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ", (error, results) => {
    if (error) {
      return response.status(400).json({
        success: false,
        error: error.name,
        message: error.message,
      });
    }
    response.status(200).json(results.rows);
  });
};
const RegisterUsers = (request, response) => {
  const {userid,username,userage}=request.body;
  pool.query("Insert into users values($1,$2,$3) ",[userid,username,userage], (error, results) => {
    if (error) {
      return response.status(400).json({
        success: false,
        error: error.name,
        message: error.message,
      });
    }
    response.status(201).send(`User added with ID: ${results.insertId}`);
  });
};

//User login

const loginUser = (request, response) => {
  const { username, password } = request.body;
  const query = "select pid from passenger where pname = $1";
  pool.query(query, ["tom"], (error, results) => {
    if (error) {
      return response.status(400).json({
        success: false,
        error: error.name,
        message: error.message,
      });
    }
    response.status(200).json(results.rows);
  });
};

//admin login

const loginAdmin = (request, response) => {
  const { username, password } = request.body;
  const query =
    "select aid from admin where aname = $1 and password = crypt($2, password)";
  pool.query(query, ["shinoj", "shinoj12345"], (error, results) => {
    if (error) {
      return response.status(400).json({
        success: false,
        error: error.name,
        message: error.message,
      });
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getUsers,
<<<<<<< Updated upstream
  RegisterUsers,
  pool,
=======
  loginUser,
  loginAdmin,
>>>>>>> Stashed changes
};
