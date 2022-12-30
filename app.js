const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./queries");
const { request } = require("http");
const { response } = require("express");
const bodyparser=require("body-parser");
const bodyParser = require("body-parser");

dotenv.config();
app.use(bodyParser.json());
var urlencodedParser=bodyparser.urlencoded({extended:true});
app.set('view engine','ejs');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  response.json({
    message: "Welcome to the cargos webapp",
    routes: [
      {
        route: "/users",
        methods: ["GET", "POST"],
      },
      {
        route: "/register",
        methods: ["POST"],
      },
      {
        route: "/login/user",
        methods: ["GET", "POST"],
      },
      {
        route: "/login/admin",
        methods: ["GET", "POST"],
      },
      {
        route: "/login/admin/showFlights",
        methods: ["GET", "POST"],
      },
      {
        route: "/login/admin/showBookings",
        methods: ["GET", "POST"],
      },
      {
        route: "/login/admin/showRoutes",
        methods: ["GET", "POST"],
      },
      {
        route: "/login/admin/insertDistances",
        methods: ["GET", "POST"],
      },
      {
        route: "/login/admin/insertRoutes",
        methods: ["GET", "POST"],
      },
      {
        route: "/login/admin/insertFlights",
        methods: ["GET", "POST"],
      },
    ],
  });
});

app.get("/users", db.getUsers);
app.post("/register", db.RegisterUsers);
app.get("/login/user", db.loginUser);
app.get("/login/admin", db.loginAdmin);
app.get("/login/admin/showFlights",db.showFlights);
app.get("/login/admin/showBookings",db.showBookings);
app.get("/login/admin/showPassenger",db.showPassenger);
app.get("/login/admin/showRoutes",db.showRoutes);
app.get("/login/admin/showDistances",db.showDistances);
app.get("/login/admin/insertDistances",db.insertDistances);
app.get("/login/admin/insertRoutes",db.insertRoutes);
app.get("/login/admin/insertFlights",db.insertFlights);

app.listen(process.env.PORT, () => console.log("app is running"));

