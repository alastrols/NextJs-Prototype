var jwt = require("jsonwebtoken");

const secretKey = "I_Love_Lucky";

function getToken(json) {
  return (token = jwt.sign(json, secretKey, {
    expiresIn: 8640000, // expires in 24 hours
  }));
}

function verifyToken(req, res, next) {
  // console.log("Verify Token: " + JSON.stringify(req.headers));
  var token = req.headers["admin-access-token"].split(" ")[1];

  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    req.user_id = decoded.user_id;
    req.username = decoded.username;
    req.token = token;
    next();
  });
}

module.exports = { getToken, verifyToken };
