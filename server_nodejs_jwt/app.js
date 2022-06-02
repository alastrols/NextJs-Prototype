const express = require("express");
const app = express();
const { connection } = require("./mysql");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs/dist/bcrypt");
const formidable = require("formidable");
const fs = require("fs-extra");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const { getToken, verifyToken } = require("./jwtHandler");

app.get("/", function (req, res) {
  res.json("success");
});

app.post("/register", async function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  var password = hashedPassword;
  await connection.query(
    "INSERT INTO user (username, password, fullname) VALUES (?, ?, ?)",
    [req.body.username, password, req.body.fullname]
  );
  res.json("success");
});

app.post("/login", async function (req, res) {
  var username = req.body.username;
  const [user, result] = await connection.query(
    `SELECT * FROM user WHERE username = '${username}'`
  );
  var passwordIsValid = bcrypt.compareSync(req.body.password, user[0].password);
  if (passwordIsValid) {
    var token = getToken({ user_id: user.user_id, username: user.username });
    res.json({ status: "success", token: token });
  } else {
    res.json("Failed!");
  }
});

app.get("/feed", verifyToken, function (req, res) {
  res.json("success");
});

app.post("/uploads", (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (error, fields, files) => {
    console.log(files);
    var newname = Date.now();
    var oldpath = files.userfile.filepath;

    var newpath =
      __dirname +
      "/upload/" +
      newname.toString() +
      "." +
      files.userfile.originalFilename.split(".").pop();

    fs.move(oldpath, newpath, function (err) {
      res.json({ result: "Upload Successfully", account: fields });
    });
  });
});

app.post("/api/admin/login", async function (req, res) {
  var username = req.body.username;
  const [user, result] = await connection.query(
    `SELECT * FROM user WHERE username = '${username}'`
  );

  var passwordIsValid = bcrypt.compareSync(req.body.password, user[0].password);
  if (passwordIsValid) {
    var token = getToken({
      user_id: user[0].user_id,
      username: user[0].username,
    });

    res.json({
      status: "success",
      data: {
        token: token,
        user_id: user[0].user_id,
        username: user[0].username,
        fullname: user[0].fullname,
      },
    });
  } else {
    res.json("Failed!");
  }
});

app.post("/api/admin/register", async function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  var password = hashedPassword;
  await connection.query(
    "INSERT INTO user (username, password, fullname) VALUES (?, ?, ?)",
    [req.body.username, password, req.body.fullname]
  );
  res.json("success");
});

app.get("/api/admin/profile", verifyToken, async (req, res) => {
  const { user_id, username, token } = req;
  const [user, result] = await connection.query(
    `SELECT * FROM user WHERE user_id = '${user_id}'`
  );

  res.json({
    status: "success",
    data: {
      user_id: user[0].user_id,
      username: user[0].username,
      fullname: user[0].fullname,
      token: token,
    },
  });
});

app.post("/api/admin/banner/add", (req, res) => {
  let form = new formidable.IncomingForm();

  form.parse(req, (error, fields, files) => {
    const banner_name = fields.banner_name;
    const post_date = fields.post_date;
    const status = fields.status;

    var newname = Date.now();
    var oldpath = files.banner.filepath;
    var extension = files.banner.originalFilename
      .split(".")
      .pop()
      .toLowerCase();
    var original_name =
      files.banner.originalFilename.split(".")[0] + "." + extension;
    var newpath =
      __dirname + "/upload/banner/" + newname.toString() + "." + extension;
    const banner = newname.toString() + "." + extension;
    fs.move(oldpath, newpath, async function (err) {
      await connection.query(
        `INSERT INTO banner (banner_name, post_date, original_name, banner, status) VALUES ("${banner_name}", "${post_date}", "${original_name}", "${banner}", "${status}")`
      );

      res.json({ status: "success" });
    });
  });
});

app.listen(3001, function () {
  console.log("listening on port : 3001");
});
