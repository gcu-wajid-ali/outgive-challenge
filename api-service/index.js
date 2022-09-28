require('dotenv').config();

var createError = require("http-errors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// * App initialization
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// middleware for logging
app.use(logger("dev"));

/**
 * Sync Database
 */
const db = require("./config/db.config");
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database looks fine");
  })
  .catch((error) => console.log("db error", error));

// * Healthcheck

app.use(`/health-check`, (req, res) =>
  res.json({
    success: true,
    message: `${process.env.NODE_ENV} server is running healthy`,
  })
);

/**
 * Task route
 */
var taskRouter = require("./routes/task.route");
app.use("/tasks", taskRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// middleware for error handling
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ err });
});

// * Server
const port = process.env.PORT || 4000;

app.listen(port, async () => {
  console.log(
    `🚀 ${process.env.NODE_ENV} server ready at: http://localhost:${port}`
  );
});

