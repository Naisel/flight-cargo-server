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


//user registration

const RegisterUsers = (request, response) => {
  const {username,userage, password, email}=request.body;
  const query = "Insert into passenger (pname, pgender, password, email) values($1,$2,crypt($3, gen_salt('bf')), $4)"
  pool.query(query ,[username, userage, password, email], (error, results) => {
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
const showFlights = (request, response) => {
  pool.query("SELECT * FROM flights ", (error, results) => {
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

const showBookings = (request, response) => {
  pool.query("SELECT * FROM bookings ", (error, results) => {
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

const showPassenger = (request, response) => {
  pool.query("SELECT * FROM passenger ", (error, results) => {
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

const showRoutes = (request, response) => {
  pool.query("SELECT * FROM routes ", (error, results) => {
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

const showDistances = (request, response) => {
  pool.query("SELECT * FROM routes ", (error, results) => {
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
  RegisterUsers,
  loginUser,
  loginAdmin,
  showFlights,
  showBookings,
  showPassenger,
  showRoutes,
  showDistances
};
