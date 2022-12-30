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
    ],
  });
});

app.get("/users", db.getUsers);
app.get("/register",(req,res)=>{
  res.render('register');
})
app.post("/register",urlencodedParser,(req,res)=>{
  const {userid,username,userage}=request.body;
  db.RegisterUsers
})

//getdetails


app.get("/", (request, response) => {
  response.json({ name: "naisel" });
  console.log("testing");
});





app.listen(process.env.PORT, () => console.log("app is running"));

