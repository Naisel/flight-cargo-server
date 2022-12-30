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
        route: "/login/user",
        methods: ["GET", "POST"],
      },
      {
        route: "/login/admin",
        methods: ["GET", "POST"],
      },
    ],
  });
});

app.get("/users", db.getUsers);
<<<<<<< Updated upstream
app.get("/register",(req,res)=>{
  res.render('register');
})
app.post("/register",urlencodedParser,(req,res)=>{
  const {userid,username,userage}=request.body;
  db.RegisterUsers
})
=======
app.get("/login/user", db.loginUser);
app.get("/login/admin", db.loginAdmin);
>>>>>>> Stashed changes


<<<<<<< Updated upstream

app.get("/", (request, response) => {
  response.json({ name: "naisel" });
  console.log("testing");
});
=======
>>>>>>> Stashed changes





app.listen(process.env.PORT, () => console.log("app is running"));

