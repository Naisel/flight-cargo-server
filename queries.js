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
  const { username, userage, password, email } = request.body;
  const query =
    "Insert into passenger (pname, pgender, password, email) values($1,$2,crypt($3, gen_salt('bf')), $4)";
  pool.query(query, [username, userage, password, email], (error, results) => {
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
  const query =
    "select pid from passenger where pname = $1 and password = crypt($2, password)";
  pool.query(query, [username, password], (error, results) => {
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
  pool.query(query, [username, password], (error, results) => {
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

//show flights

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

//show bookings
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

//show passenger
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

//show routes
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

//show distances
const showDistances = (request, response) => {
  pool.query("SELECT * FROM distances ", (error, results) => {
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

//admin insert distances

const insertDistances = (request, response) => {
  const { tid, source, dest, distance } = request.body;
  const query =
    "Insert into distances (tid,source, dest, distance) values($1,$2,$3, $4)";
  pool.query(query, [tid, source, dest, distance], (error, results) => {
    if (error) {
      return response.status(400).json({
        success: false,
        error: error.name,
        message: error.message,
      });
    }
    response.status(201).send(`Distance added with ID: ${results.insertId}`);
  });
};

//admin insert routes

const insertRoutes = (request, response) => {
  const { rid, fid, tid, fday, ftime, rem_space } = request.body;
  const query =
    "Insert into routes (rid,fid,tid,fday,ftime,rem_space) values($1,$2,$3,$4,$5,$6)";
  pool.query(
    query,
    [rid, fid, tid, fday, ftime, rem_space],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          success: false,
          error: error.name,
          message: error.message,
        });
      }
      response.status(201).send(`Routes added with ID: ${results.insertId}`);
    }
  );
};

//admin insert flights

const insertFlights = (request, response) => {
  const { fid, fname, fspace, frating } = request.body;
  const query =
    "Insert into routes (fid,fname,fspace,frating) values($1,$2,$3,$4)";
  pool.query(query, [fid, fname, fspace, frating], (error, results) => {
    if (error) {
      return response.status(400).json({
        success: false,
        error: error.name,
        message: error.message,
      });
    }
    response.status(201).send(`Flights added with ID: ${results.insertId}`);
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
  showDistances,
  insertDistances,
  insertFlights,
  insertRoutes,
  flightDetails,
};
