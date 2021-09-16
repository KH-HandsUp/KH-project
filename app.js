var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var myClassRouter = require("./routes/myClass");
var loginStuRouter = require("./routes/login");
var signUpRouter = require("./routes/signUp");
var answerRouter = require("./routes/answer");
var apiRouter = require("./routes/api");
const { sequelize } = require("./models");
var app = express();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터 베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var options = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
};

var sessionStore = new MySQLStore(options);

app.use(
  session({
    HttpOnly: true,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/myclass", myClassRouter);
app.use("/login", loginStuRouter);
app.use("/signUp", signUpRouter);
app.use("/answer", answerRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
