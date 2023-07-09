const express = require("express");
const app = express();
var fs = require("fs");
var path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mongo DB conncetion

mongoose.connect(
  "mongodb://127.0.0.1:27017/project",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", function () {
  console.log("Connected to mongodb");
});


app.set("view engine", "ejs");

//BodyParsing
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));
  

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  return res.render('home', {error: ''});
});
app.get("/car-rent", (req, res) => {
  return res.render('carrental', {error: ''});
});
//Routes
app.use("/", require("./routes/login"));
app.use("/", require("./routes/jobpost"));
app.use("/", require("./routes/jobfind"));
app.use("/",require("./routes/hotelpost"))
//app.use("/",require("./routes/carrent"));

const PORT = process.env.PORT || 4111;

app.listen(PORT, console.log("Server has started at port " + PORT));
