const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { request } = require("http");
const { response } = require("express");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//getdetails

app.get("/getAll", (request, response) => {
  console.log("testing");
});

app.listen(process.env.PORT, () => console.log("app is running"));
