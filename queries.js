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
  const { username, userage, usergender, password, email } = request.body;
  const query =
    "Insert into passenger (pname, page, pgender, password, email) values($1,$2,$3,crypt($4, gen_salt('bf')), $5)";
  pool.query(
    query,
    [username, userage, usergender, password, email],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          success: false,
          error: error.name,
          message: error.message,
        });
      }
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
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
  const { rid, fid, tid, fdate, ftime } = request.body;
  const query =
    "Insert into routes (rid,fid,tid,fdate,ftime) values($1,$2,$3,$4,$5)";
  pool.query(query, [rid, fid, tid, fdate, ftime], (error, results) => {
    if (error) {
      return response.status(400).json({
        success: false,
        error: error.name,
        message: error.message,
      });
    }
    response.status(201).send(`Routes added with ID: ${results.insertId}`);
  });
};

//admin insert flights

const insertFlights = (request, response) => {
  const { fid, fname, fspace, frating } = request.body;
  const query =
    "Insert into flights (fid,fname,fspace,frating) values($1,$2,$3,$4)";
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


const flightDetails = (request, response) => {
  const { source, dest, date, req_space } = request.body;
  const query =
    "select routes.rid,flights.fname,flights.frating from flights,distances,routes where distances.source=$1 and distances.dest=$2 and routes.fdate=$3 and distances.tid=routes.tid and flights.fid=routes.fid and routes.rem_space>$4";
  pool.query(query, [source, dest, date, req_space], (error, results) => {
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

//Booking

const Booking = (request, response) => {
  const { pid,space_required,rid,payment } = request.body;
  const query =
    "Insert into bookings (pid,space_required,rid,payment) values($1,$2,$3,$4)";
  const query1="Update routes set rem_space=rem_space-$1 where rid=$2"
  pool.query(
    query,
    [5,4000,101,9000],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          success: false,
          error: error.name,
          message: error.message,
        });
      }
      response.status(201).send(`Booked Succesfully with ID: ${results.insertId}`);
    }
  );
  pool.query(
    query1,[4000,101],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          success: false,
          error: error.name,
          message: error.message,
        });
      }
      response.status(201).send(`Booked Succesfully with ID: ${results.insertId}`);
    }
  );
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
  Booking,
};
