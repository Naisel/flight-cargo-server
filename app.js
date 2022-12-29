const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./queries");
const { request } = require("http");
const { response } = require("express");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  response.json({
    message: "Welcome to the cargos app",
    routes: [
      {
        route: "/users",
        methods: ["GET", "POST"],
      },
    ],
  });
});

app.get("/users", db.getUsers);

//getdetails

app.get("/", (request, response) => {
  response.json({ name: "naisel" });
  console.log("testing");
});





app.listen(process.env.PORT, () => console.log("app is running"));
