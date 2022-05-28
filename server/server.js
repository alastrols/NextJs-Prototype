const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8085;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/uploaded"));
// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use("/api/v2/authen/", require("./api_authen"));
app.use("/api/v2/stock/", require("./api_stock"));

app.listen(PORT, () => {
  console.log("Backend is running.. " + PORT);
});
